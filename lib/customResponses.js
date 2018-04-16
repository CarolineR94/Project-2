// function badrequest
// export


function customResponses(req, res, next){
  res.BadRequest = function(url, errors){
    req.flash('danger', errors);
    return res.redirect(url);
  };
  next();
}

module.exports = customResponses;
