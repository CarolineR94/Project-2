const express  = require('express');
const router   = express.Router();

const photos = require('../controllers/photos');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');


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

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/signin')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);



// user routes

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.route('/users/:id/edit')
  .get(users.edit);



// comment routes
router.route('/photos/:id/comments')
  .post(photos.createComment);

router.route('/photos/:photoId/comments/:commentId')
  .delete(photos.deleteComment);

// errors

router.route('/*').get((req, res) => {
  res.render('statics/404.ejs');
});

module.exports = router;
