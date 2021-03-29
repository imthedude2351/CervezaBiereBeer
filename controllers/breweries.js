const Brewery = require('../models/brewery');
const Beer = require('../models/beer');

module.exports = {
  index,
  show,
  new: newBrewery,
  create
};

function index(req, res) {
  Brewery.find({}, function(err, breweries) {
    res.render('breweries/index', { title: 'All Breweries', breweries });
  });
}

// function show(req, res) {
  // Brewery.findById(req.params.id)
  // .populate('cast').exec(function(err, movie) {
    // Query for performers not already in this movie's cast array
//     Performer.find(
//       {_id: {$nin: movie.cast}},
//       function(err, performers) {
//         res.render('movies/show', { title: 'Movie Detail', movie, performers });
//       }
//     );
//   });
// }

function newBrewery(req, res) {
  res.render('breweries/new', { title: 'Add Brewery' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  // req.body.nowShowing = !!req.body.nowShowing;
  // for (let key in req.body) {
    // if (req.body[key] === '') delete req.body[key];
  // }
  const brewery = new Brewery(req.body);
  brewery.save(function(err) {
    if (err) return res.redirect('/breweries/new');
    console.log(brewery);
    res.redirect(`/breweries/${brewery._id}`);
  });
}
