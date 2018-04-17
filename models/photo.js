const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
  url: String,
  caption: String,
  comments: [{type: String}],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Photo', photoSchema);
