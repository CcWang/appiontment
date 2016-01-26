myApp.factory('MainFactory', function ($http) {
  var factory = {};
  factory.user;
  factory.index = function (cb){
    $http.get('/get_all').success(cb);
  }
  factory.findOne = function (data, cb){
    $http.post('/find_one',data).success(cb);
  }
  factory.remove = function (data,cb){
    $http.post('/remove', data).success(cb);
  }
  return factory;
});
myApp.factory('AppFactory', function($http){
  var factory ={}
  factory.check = function(info,cb){
    $http.post('/check', info).success(cb);
  };
  factory.create = function (info,cb){
    $http.post('/create', info).success(cb);
  }
  return factory;
});