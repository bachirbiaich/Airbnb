var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
User = require('../schemas/User');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  User.find(req.query,'',function(err,users){
    if (err)
      res.status(404).send(err);
    else
      res.send(users);
  });
});

/* GET user by id */
router.get('/:_id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  User.find({_id: req.params._id},'',function(err,user){
    if (err)
      res.status(404).send(err);
    else
      res.send(user[0]);
  });
});

/* POST new user*/
router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var newUser = new User(req.body);
  newUser.save(function(err,data){
    if (err)
      res.status(400).send(err);
    else
      res.location(`/users/${data._id}`);
      res.status(201).send(data);
  });
});

/* PATCH user by id */
router.patch('/:_id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  User.update({_id: req.params._id},req.body,{multi: false},function(err,data){
    if (err)
      res.status(400).send(err);
    else
      res.send(data);
  });
});

/* DELETE user by id */
router.delete('/:_id', function(req, res, next) {
  User.remove({_id: req.params._id},function(err){
    if (err)
      res.status(404).send(err);
    else
      res.status(204).send();
  });
});


module.exports = router;