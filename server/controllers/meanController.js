var mongoose = require('mongoose');
var Appointment =mongoose.model('Appointment');
module.exports = {
  index: function (req,res){
    Appointment.find({}, function(err,data){
      if(err){
        console.log('db cannot find');
      }else{
        res.json(data);
      };
    })
  },
  check: function (req,res) {
    Appointment.count({date:req.body.date},function(err, data){
      if(err){
        console.log('db wrong');
      }else{
         res.json(data);
      };
    })
  },
  create: function (req,res){
    console.log('create fucntion'+ req.body)
    var new_app = new Appointment({date: req.body.date, 
                  time: req.body.time,
                  patient: req.body.patient.user,
                  complain: req.body.complain });
    new_app.save(function (err, data){
      if (err) {
        console.log('db wrong');
      }else{
        res.json({success:'Successfully submit a new appointment!'})
      };
    })
  },
  findOne: function (req,res) {
    Appointment.findOne({_id:req.body._id}, function (err ,data){
      if (err) {
        console.log('db cannot find');
      }else{
        res.json(data);
        console.log(data);
      };
    })
  },
  remove: function (req,res){
    Appointment.remove({_id:req.body._id},function (err, data){
      if(err){
        console.log('db cannot delete');
      }else{
        // console.log('delete');
        res.redirect('/get_all');
      }
    })
  }
  
};
