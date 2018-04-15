// require user model
// new route
// create route
// export


const User = require('../models/user');

function newRoute(req, res) {
  res.render('auth/register');
}

function createRoute(req, res){
  console.log(req.body);
  User
    .create(req.body)
    .then(() =>{
      res.redirect('/');
    })
    .catch((err) => {
      if(err.name === 'ValidationError'){
        console.log(err);
        return res.status(400).render('auth/register', {message: err.toString()});
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
