var mongoose = require('mongoose');
var fs = require('fs');
//rememver to chang db name
mongoose.connect('mongodb://localhost/FM_BB_Appoinments');
var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') > 0){
    require(models_path + '/' + file);
  }
})
