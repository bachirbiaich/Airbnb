var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//User schema
var Schema = mongoose.Schema;

var User = new Schema({
  username : { type: String, required: true, index: { unique: true } },
  pass : { type: String, required: true },
  firstname : { type: String, required: true },
  lastname : { type: String, required: true },
  mail : { type: mongoose.SchemaTypes.Email, required: true },
  phone : { type: String, required: true, validate: { validator: function(v) {return /(\+\d{1-3}|00\d{1-3}|0)\d{9}/.test(v);} } },
  last_connexion : { type: Date, required: false },
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
