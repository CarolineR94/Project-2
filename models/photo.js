// require mongoose comments
// photoschema
// export


const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
  url: String,
  caption: String,
  comments: [{type: String}]
});


module.exports = mongoose.model('Photo', photoSchema);
