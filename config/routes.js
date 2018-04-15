// constants: router photos registrations sessions
// functions: secure route
// routes: 7 crud restful for photos
// authentication routes: signup, signin, logout
// 404 route
//
// export router


const express  = require('express');
const router   = express.Router();

const photos = require('../controllers/photos');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');


function secureRoute (req, res, next){
  if(!req.session.userId){
    return req.session.regenerate(() =>{
      req.flash('danger', 'You must be logged in');
      res.redirect('/');
    });
  }
  return next();
}

router.route('/')
  .get(photos.index);

router.route('/private')
  .get(secureRoute, photos.private);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
