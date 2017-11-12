var mongoose = require('mongoose');

//Apartment schema
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
  user_owner_id : { type: String, required: true },
  name : { type: String, required: true },
  desc : { type: String, required: true },
  location : { type: String, required: true },
  pictures : {  type: [{ 
                        name : { type: String, required: true },
                        path : { type: String, required: true },
                      }],
                minlength: 1
             },
  availability : {  type: { 
                                start : { type: Date, required: true },
                                end : { type: Date, required: true },
                           },
                 },
});

var Apartment = mongoose.model('apartments', apartmentSchema);

module.exports = Apartment;