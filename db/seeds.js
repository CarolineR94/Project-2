// require mongoose bluebird environment
// const photo comments
// drop collecion photo comments
//
// create photo array of objects


const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);


const Photo = require('../models/photo');

Photo.collection.drop();


Photo.create([{
  url: 'http://via.placeholder.com/350x150',
  caption: 'caption goes here',
  comments: 'comments go here'


}])
  .then(photos => console.log(`You have just made ${photos.length} photos`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
