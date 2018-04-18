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
const User = require('../models/user');

User.collection.drop();
Photo.collection.drop();


User.create([
  {
    username: 'a',
    email: 'a@a',
    password: 'a',
    passwordConfirmation: 'a',
    picture: 'http://www.fillmurray.com/150/150'
  },
  {
    username: 'b',
    email: 'b@b',
    password: 'b',
    passwordConfirmation: 'b',
    picture: 'http://www.fillmurray.com/150/150'
  },
  {
    username: 'c',
    email: 'c@c',
    password: 'c',
    passwordConfirmation: 'c',
    picture: 'http://www.fillmurray.com/150/150'
  }
])
  .then(users => {
    console.log(`${users.length} users were added to the DB.`);

    return Photo.create([
      {
        url: 'http://via.placeholder.com/350x150',
        caption: 'caption 1',
        comments: [],
        user: users[0]._id
      },
      {
        url: 'http://via.placeholder.com/350x150',
        caption: 'caption 2',
        comments: [],
        user: users[0]._id
      },
      {
        url: 'http://via.placeholder.com/350x150',
        caption: 'caption 3',
        comments: [],
        user: users[1]._id
      },
      {
        url: 'http://via.placeholder.com/350x150',
        caption: 'caption 4',
        comments: [],
        user: users[1]._id
      },
      {
        url: 'http://via.placeholder.com/350x150',
        caption: 'caption 5',
        comments: [],
        user: users[1]._id
      },
      {
        url: 'http://via.placeholder.com/350x150',
        caption: 'caption 6',
        comments: [],
        user: users[2]._id
      }
    ]);
  })
  .then(photos => console.log(`You have just made ${photos.length} photos`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
