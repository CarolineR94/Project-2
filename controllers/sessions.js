// require user model
// functions: new, create and delete route
// export

const User = require('../models/user');

function newRoute(req, res) {
  res.render('auth/login', {name: 'abc'});
}

function createRoute(req, res) {
  User
    .findOne({email: req.body.email})
    .then((user) =>{
      if(!user || !user.validatePassword(req.body.password)){
        req.flash('danger', 'Incorrect details.');
        res.status(401).render('auth/login', {message: 'Wrong credentials'});
      }
      req.session.userId = user._id;
      res.redirect('/');
    });
}


function deleteRoute(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}



module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
