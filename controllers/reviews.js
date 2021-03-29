const Brewery = require('../models/brewery');

module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  Brewery.findOne({'reviews._id': req.params.id}).then(function(brewery) {
    const review = brewery.reviews.id(req.params.id);
    // ensure the review was created by the logged in user
    if(!review.user.equals(req.user._id)) return res.redirect(`/breweries/${brewery._id}`);
    review.remove();
    brewery.save().then(function() {
      res.redirect(`/breweries/${brewery._id}`);
    }).catch(function(err){
      // Let Express display an error
      return next(err);
      // Another option
      // res.redirect(`/movies/${movie._id}`);
    });
  });
}

function create(req, res) {
  Brewery.findById(req.params.id, function(err, brewery) {
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    brewery.reviews.push(req.body);
    brewery.save(function(err) {
      res.redirect(`/breweries/${brewery._id}`);
    });
  });
}