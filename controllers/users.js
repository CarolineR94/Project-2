const User = require('../models/user');

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

module.exports = {
  edit: editRoute
};
