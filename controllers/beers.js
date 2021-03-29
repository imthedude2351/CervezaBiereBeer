const Beer = require('../models/beer');
const Brewery = require('../models/brewery');

module.exports = {
  new: newBeer,
  create,
//   addToCast
};

// function addToCast(req, res) {
//   Movie.findById(req.params.id, function(err, movie) {
//     movie.cast.push(req.body.performerId);
//     movie.save(function(err) {
//       res.redirect(`/movies/${movie._id}`);
//     });
//   });
// }

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Beer.create(req.body, function (err, beer) {
    res.redirect('/beers/new');
  });
}

function newBeer(req, res) {
  Beer.find({}, function (err, beers) {
    res.render('beers/new', {
      title: 'Add Beer',
      beers
    });
  })
}