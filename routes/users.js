var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//User schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username : { type: String, required: true, index: { unique: true } },
  pass : { type: String, required: true },
  firstname : { type: String, required: true },
  lastname : { type: String, required: true },
  mail : { type: String, required: true, validate: { validator: function(mail) {return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)} } },
  phone : { type: String, required: true, validate: { validator: function(phone) {return /(\+\d{1-3}|00\d{1-3}|0)\d{9}/.test(phone);} } },
  last_connexion : { type: Date, required: false },
});
var User = mongoose.model('users', userSchema);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  User.find({},'',function(err,users){
    if (err)
      res.send(err);
    else
      res.send(users);
  });
});

module.exports = router;
