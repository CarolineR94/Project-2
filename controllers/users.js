const User = require('../models/user');

function showRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(users => {
      if(users) return res.sendStatus(404);
      return res.render('users/show', {users });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}


function editRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      return res.render('users/edit', { user });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}



function updateRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.redirect(`/users/${user._id}`)) 
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}


module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute
};
