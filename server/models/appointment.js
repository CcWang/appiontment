var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
  date:String,
  time:String,
  patient:String,
  complain:String
})

mongoose.model('Appointment', appointmentSchema);