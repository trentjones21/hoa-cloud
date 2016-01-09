// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User info, with items owned by that user
var hoaSchema = new Schema({
  name: String,
  message: String,
  announcements: Array,
  bucket_name: {type: String}
});


// create user
var Hoa = mongoose.model('hoa', hoaSchema);

module.exports = Hoa;
