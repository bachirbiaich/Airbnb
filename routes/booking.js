var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//reservations schema
var Schema = mongoose.Schema;
var bookingSchema = new Schema(
    [
        {
            _id : { type: String, required: true },
            user_id : { type: String, required: true },
            announcement_id : { type: String, required: true },
            start : { type: Date, required: true },
            end : { type: Date, required: true }
           /* "_id": "1",
            "user_id": "85",
            "announcement_id": "2",
            "start": new Date(2017,01,01),
            "end": new Date(2017,02,01)
        },
        {
            "_id": "2",
            "user_id": "85",
            "announcement_id": "4",
            "start": new Date(2017,02,01),
            "end": new Date(2017,04,01)*/
        }
    ]);

var Booking = mongoose.model('booking', bookingSchema);


/* GET reservations listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  Booking.find(req.query,'',function(err,booking){
    if (err)
      res.status(404).send(err);
    else
      res.send(booking);
  });
});

/* GET reservations by id */
router.get('/:_id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  Booking.find({_id: req.params._id},'',function(err,booking){
    if (err)
      res.status(404).send(err);
    else
      res.send(booking[0]);
  });
});

/* POST new reservations*/
router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var newBooking = new Reservations(req.body);
  newBooking.save(function(err,data){
    if (err)
      res.status(400).send(err);
    else
      res.location(`/booking/${data._id}`);
      res.status(201).send(data);
  });
});

/* PATCH reservations by id */
router.patch('/:_id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  Booking.update({_id: req.params._id},req.body,{multi: false},function(err,data){
    if (err)
      res.status(400).send(err);
    else
      res.send(data);
  });
});

/* DELETE reservations by id */
router.delete('/:_id', function(req, res, next) {
    Booking.remove({_id: req.params._id},function(err){
    if (err)
      res.status(404).send(err);
    else
      res.status(204).send();
  });
});


module.exports = router;
