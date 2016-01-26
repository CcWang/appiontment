myApp.controller('HomeController', function ($scope, MainFactory) {
  var user;
  $scope.now = new Date();
  console.log($scope.now);
  $scope.login = function(){
    user = prompt('Please enter your name');
    $scope.user = {'user':user};
    MainFactory.user = $scope.user;
  };
  $scope.logout = function(){
    $scope.user = {};
    MainFactory.user = $scope.user;
  };
  if (MainFactory.user == undefined) {
    $scope.login();
  };
  var get_apps = function (data){
    $scope.apps = data;
  }
  MainFactory.index(get_apps);
  $scope.patient = MainFactory.user;
  $scope.remove = function (data){
    //check at least 1 day before the appointment schedule
    MainFactory.findOne(
      data, 
      function(res){
        var TBC = (new Date(res.date).getTime());
        var now = new Date().getTime();
        var oneDay = 86400
        if((TBC- now)/1000 >= oneDay) {
          MainFactory.remove(
            data,
            get_apps
          );
        }else{
          $scope.err = 'You can only cancel at least 1 day before appointment schedule';
        };
      }
    );
    
  }
  // console.log('testing user:'+ $scope.patient.user);
});

myApp.controller('AppController', function ($scope, MainFactory, AppFactory){
  $scope.patient = MainFactory.user;
  $scope.timeArray =[];
  $scope.getTime = function(){
    for(var i= 8; i<18; i++){
      if (i<13) {
        $scope.timeArray.push(i+":00 AM")
      }else{
        $scope.timeArray.push(i-12+":00 PM")
      };
    };
    return $scope.timeArray;
  };
  $scope.getTime();
  $scope.cancel =function (){
    $scope.new_app = {};
  }
  //check user input date is greater than current date;
  $scope.checkDate = function(){
    if(!$scope.new_app.date){
      $scope.message = 'Please enter date';
      return false;
    }else{
      var input = $scope.new_app.date.getTime();
      var now = new Date().getTime();
      if(now > input) {
        $scope.message = 'Please pick a future date';
        return false;
      }
      return true;
    }
  };
  //check Complain length
  $scope.checkComp = function(){
    if(!$scope.new_app.complain){
      $scope.message ='Please enter a complain';
      return false;
    };
    if($scope.new_app.complain.length <10) {
      $scope.message ='Complain should be at least 10 characters';
      return false;
    };
    return true;
  };
  $scope.create = function(){
    if(!$scope.patient){
      $scope.message = 'Please log in first';
      return false;
    };
    //check if time entered
    if(!$scope.new_app.time){
       $scope.message = 'Please enter time';
      return false;
    }
    $scope.new_app.patient = $scope.patient;
    if ($scope.checkDate() && $scope.checkComp()) {
      //check db that day has 3 appiontments already
      AppFactory.check(
        $scope.new_app, 
        function(data){
          $scope.thatDayApp = data;
          if($scope.thatDayApp <3 ){
            //create function
            AppFactory.create(
              $scope.new_app,
              function(data){$scope.message = data}
            );
          //end of create function
          }else{
             $scope.message = 'No more available time on'+ $scope.new_app.date+'Please pick another date';
          };
        }
      ); 
    };
    
  }
  //end of create function
});