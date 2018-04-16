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

router.get('/', (req, res) => res.redirect('photos'));

// photo routes

router.route('/photos') // controllers/photos
  .get(photos.index)
  .post(photos.create);


router.route('/photos/new')
  .get(secureRoute, photos.new);

router.route('/photos/:id')
  .get(photos.show)
  .delete(photos.delete)
  .put(photos.update);


router.route('/photos/:id/edit')
  .get(photos.edit);

// authentication

// router.route('/')
//   .get(photos.index);

// router.route('/private')
//   .get(secureRoute, photos.private);

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/signin')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


router.route('/*').get((req, res) => {
  res.render('statics/404.ejs');
});

module.exports = router;
