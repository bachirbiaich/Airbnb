var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Booking = require('../schemas/Booking');


/* GET booking listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Booking.find(req.query,'',function(err,booking){
      if (err)
        res.status(404).send(err);
      else
        res.send(booking);
    });
  });
  
/* GET booking by id */
router.get('/:_id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Booking.find({_id: req.params._id},'',function(err,booking){
      if (err)
        res.status(404).send(err);
      else
        res.send(booking[0]);
    });
  });
  
/* POST new booking*/
router.post('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var newBooking = new Booking(req.body);
    newBooking.save(function(err,data){
      if (err)
        res.status(400).send(err);
      else
        res.location(`/booking/${data._id}`);
        res.status(201).send(data);
    });
  });
  
/* PATCH booking by id */
router.patch('/:_id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Booking.update({_id: req.params._id},req.body,{multi: false},function(err,data){
      if (err)
        res.status(400).send(err);
      else
        res.send(data);
    });
  });
  
/* DELETE booking by id */
router.delete('/:_id', function(req, res, next) {
    Booking.remove({_id: req.params._id},function(err){
      if (err)
        res.status(404).send(err);
      else
        res.status(204).send();
    });
  });

module.exports = router;