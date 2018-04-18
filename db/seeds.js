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
    username: 'Alice',
    email: 'a@a',
    password: 'a',
    passwordConfirmation: 'a',
    picture: 'https://d3iw72m71ie81c.cloudfront.net/female-44.jpg'
  },
  {
    username: 'Ben',
    email: 'b@b',
    password: 'b',
    passwordConfirmation: 'b',
    picture: 'https://d3iw72m71ie81c.cloudfront.net/male-3.jpg'
  },
  {
    username: 'Charlie',
    email: 'c@c',
    password: 'c',
    passwordConfirmation: 'c',
    picture: ''
  }
])
  .then(users => {
    console.log(`${users.length} users were added to the DB.`);

    return Photo.create([
      {
        url: 'https://user-images.githubusercontent.com/36160470/38931619-b3e77bb0-430b-11e8-861d-9689bd268c7c.png',
        caption: 'Cook/Drinkall at GB final trials this weekend',
        comments: [],
        user: users[0]._id
      },
      {
        url: 'https://user-images.githubusercontent.com/36160470/38932747-02971dbc-430f-11e8-810f-0a369a4597e1.png',
        caption: 'Men\'s winners from today\'s trial',
        comments: [],
        user: users[0]._id
      },
      {
        url: 'https://user-images.githubusercontent.com/36160470/38931806-4d04a778-430c-11e8-9baf-239e4e01a3a3.png',
        caption: 'Women\'s pairs in action',
        comments: [],
        user: users[1]._id
      },
      {
        url: 'https://user-images.githubusercontent.com/36160470/38931855-69a1cd02-430c-11e8-8fa3-10101c02f02a.png',
        caption: 'Vicky Thornley victorious in women\'s singles',
        comments: [],
        user: users[1]._id
      },
      {
        url: 'https://user-images.githubusercontent.com/36160470/38931904-92cedbac-430c-11e8-8298-c1d4b7dc6e4c.png',
        caption: 'Tarrant/Sinclair',
        comments: [],
        user: users[1]._id
      },
      {
        url: 'https://user-images.githubusercontent.com/36160470/38931973-c63a81e4-430c-11e8-808d-e08608a3d953.png',
        caption: 'Copus single',
        comments: [],
        user: users[2]._id
      },
      {
        url: 'https://user-images.githubusercontent.com/36160470/38931999-da9b0b9a-430c-11e8-9bf0-14e003f9a098.png',
        caption: 'Leander out in force',
        comments: [],
        user: users[2]._id
      }
    ]);
  })
  .then(photos => console.log(`You have just made ${photos.length} photos`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
