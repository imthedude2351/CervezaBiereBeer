const Beer = require('../models/beer');

module.exports = {
    index,
    new: newBeer,
    create
};

function index(req, res) {
    Beer.find({}, function(err, beers) {
        res.render('beers/index', { title: 'All Beers', beers });
    });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const beer = new Beer(req.body);
    beer.save(function(err) {
        if (err) return res.redirect('/beers/new');
        console.log(beer);
        res.redirect(`/beers/${beer._id}`);
    });
}

function newBeer(req, res){
    res.render('beers/new', { title: 'Add Beer' });
}