
// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

// User info, with items owned by that user
var hoaSchema = new Schema({
  name: String,
  bucket_name: {type: String}
});

// add findOrCreate
hoaSchema.plugin(findOrCreate);

// create user
var Hoa = mongoose.model('hoa', hoaSchema);

module.exports = Hoa;
