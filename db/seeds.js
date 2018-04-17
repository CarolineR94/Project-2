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


Photo.create([
  {url: 'http://via.placeholder.com/350x150',
    caption: 'caption 1',
    comments: []},
  {url: 'http://via.placeholder.com/350x150',
    caption: 'caption 2',
    comments: []},
  {url: 'http://via.placeholder.com/350x150',
    caption: 'caption 3',
    comments: []},
  {url: 'http://via.placeholder.com/350x150',
    caption: 'caption 4',
    comments: []},
  {url: 'http://via.placeholder.com/350x150',
    caption: 'caption 5',
    comments: []},
  {url: 'http://via.placeholder.com/350x150',
    caption: 'caption 6',
    comments: []}
])
  .then(photos => console.log(`You have just made ${photos.length} photos`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
