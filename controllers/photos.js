// require model, crud restful functions and export

const Photo = require('../models/photo');


function photosIndex(req, res) {
  Photo
    .find()
    .exec()
    .then(photos => res.render('photos/index', { photos }))
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

function photosNew(req, res) {
  return res.render('photos/new');
}

function photosCreate(req, res) {
  req.body.user = req.currentUser;

  Photo
    .create(req.body)
    .then(() => res.redirect('/photos'))
    .catch((error) =>{
      if(error.name === 'ValidationError'){
        return res.BadRequest('/albums/new', error.toString());
      }
    });
}


function photosShow(req, res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      if(!photo) return res.sendStatus(404);
      return res.render('photos/show', { photo });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}


function photosEdit(req, res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      if(!photo) return res.sendStatus(404);
      return res.render('photos/edit', { photo });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

function photosUpdate(req, res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      if(!photo) return res.sendStatus(404);
      Object.assign(photo, req.body);
      return photo.save();
    })
    .then(() => res.redirect(`/photos/${req.params.id}`)) // goes back to show
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

function photosDelete(req, res) {
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo => {
      if(!photo) return res.sendStatus(404);
      return photo.remove();
    })
    .then(() => res.redirect('/photos'))
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

module.exports = {
  index: photosIndex,
  new: photosNew,
  create: photosCreate,
  show: photosShow,
  edit: photosEdit,
  update: photosUpdate,
  delete: photosDelete
};














// const User = require('../models/user');
//
// function indexRoute(req, res) {
//   User
//     .find()
//     .exec()
//     .then((users) => res.render('index', { users }));
// }
//
//
// function privateRoute(req, res){
//   res.render('private');
// }
//
// module.exports = {
//   index: indexRoute,
//   private: privateRoute
// };
