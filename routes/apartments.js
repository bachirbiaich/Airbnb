var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Apartment = require('../schemas/Apartment');


/* GET apartments listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Apartment.find(req.query,'',function(err,apartments){
      if (err)
        res.status(404).send(err);
      else
        res.send(apartments);
    });
  });
  
/* GET apartment by id */
router.get('/:_id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Apartment.find({_id: req.params._id},'',function(err,apartment){
      if (err)
        res.status(404).send(err);
      else
        res.send(apartment[0]);
    });
  });
  
/* POST new apartment*/
router.post('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var newApartment = new Apartment(req.body);
    newApartment.save(function(err,data){
      if (err)
        res.status(400).send(err);
      else
        res.location(`/apartments/${data._id}`);
        res.status(201).send(data);
    });
  });
  
/* PATCH apartment by id */
router.patch('/:_id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    Apartment.update({_id: req.params._id},req.body,{multi: false},function(err,data){
      if (err)
        res.status(400).send(err);
      else
        res.send(data);
    });
  });
  
/* DELETE apartment by id */
router.delete('/:_id', function(req, res, next) {
    Apartment.remove({_id: req.params._id},function(err){
      if (err)
        res.status(404).send(err);
      else
        res.status(204).send();
    });
  });

module.exports = router;