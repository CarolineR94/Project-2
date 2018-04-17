// require model, crud restful functions and export

const Photo = require('../models/photo');


function photosIndex(req, res) {
  Photo
    .find()
    .populate('user')
    .exec()
    .then(photos => {
      console.log(photos);
      res.render('photos/index', { photos });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

function photosNew(req, res) {
  res.render('photos/new', {error: null});
}

function photosCreate(req, res) {
  req.body.user = req.currentUser;

  Photo
    .create(req.body)
    .then(() => res.redirect('/photos'))
    .catch((error) =>{
      if(error.name === 'ValidationError'){
        return res.BadRequest('/photos/new', error.toString());
      }
    });
}


function photosShow(req, res) {
  Photo
    .findById(req.params.id)
    .populate('user')
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
    .populate('user')
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
    .then(photo => res.redirect(`/photos/${photo._id}`)) // goes back to show
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


function commentCreate(req, res){
  Photo
    .findById(req.params.id)
    .exec()
    .then(photo =>{
      req.body.user = req.currentUser;
      const comment = new Comment(req.body);

      photo.comments.push(comment);
      return photo.save();
    })
    .then(photo => {
      res.redirect(`/photos/${photo._id}`);
    })
    .catch(err => console.log(err));
}




module.exports = {
  index: photosIndex,
  new: photosNew,
  create: photosCreate,
  show: photosShow,
  edit: photosEdit,
  update: photosUpdate,
  delete: photosDelete,
  commentCreate: commentCreate
};
