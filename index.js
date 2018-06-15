const express = require('express');
const app = express();
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const customResponses = require('./lib/customResponses');
const User = require('./models/user');
const routes = require('./config/routes');
const { port, dbURI } = require('./config/environment');

mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));



app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));


app.use(morgan('dev'));
app.use(expressLayouts);
app.use(flash());
app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));



app.use((req, res, next) =>{
  if(!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) =>{
      req.session.userId = user._id;
      res.locals.user = user;
      req.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
});


app.use(routes);


// wrong url
app.use((err, req, res, next) =>{
  if(err){
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.status);
    res.locals.err = err;
    return res.render(`statics/${err.status}`);
  }
  next();
});

app.listen(port, () => console.log(`Express started on port: ${port}`));
