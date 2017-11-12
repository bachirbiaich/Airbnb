var mongoose = require('mongoose');

//Booking schema
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
  user_id : { type: String, required: true },
  apartment_id : { type: String, required: true },
  start : { type: Date, required: true },
  end : { type: Date, required: true }
});

var Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;