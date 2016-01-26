var meanController = require('./../controllers/meanController.js');

module.exports = function(app){
  app.get('/get_all', function (req,res){
    meanController.index(req,res);
  })
  app.post('/check', function (req,res){
    meanController.check(req,res);
  })
  app.post('/create', function (req,res){
    meanController.create(req,res);
  })
  app.post('/find_one', function (req,res){
    meanController.findOne(req,res);
  })
  app.post('/remove', function (req,res){
    meanController.remove(req,res);
  })
}