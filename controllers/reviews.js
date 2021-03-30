const Beer = require('../models/beer');

module.exports = {
  create,
  update,
  delete: deleteReview
};

function update(req, res) {
    Beer.findOne({'reviews._id': req.params.id}, function(err, beer) {
        let review = beer.reviews.id(req.params.id);
        Object.assign(review, req.body);
        beer.save(function(err) {
            res.redirect(`/beers/${beer._id}`);
        })
    })
}

function deleteReview(req, res, next) {
  Beer.findOne({'reviews._id': req.params.id}).then(function(beer) {
    const review = beer.reviews.id(req.params.id);
    if(!review.user.equals(req.user._id)) return res.redirect(`/beers/${beer._id}`);
    review.remove();
    beer.save().then(function() {
      res.redirect(`/beers/${beer._id}`);
    }).catch(function(err){
      return next(err);
      // Another option
      // res.redirect(`/beers/${beer._id}`);
    });
  });
}

function create(req, res) {
  Beer.findById(req.params.id, function(err, beer) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    beer.reviews.push(req.body);
    beer.save(function(err) {
      res.redirect(`/beers/${beer._id}`);
    });
  });
}