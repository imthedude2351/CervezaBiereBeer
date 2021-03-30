const Beer = require('../models/beer');

module.exports = {
    index,
    show,
    new: newBeer,
    create,
    // delete: deleteBeer,
};

// function deleteBeer(req, res) {
//     Beer.findByIdAndDelete(req.params.id, function(err, deletedPupster) {
//         if (err) console.log(err);
//         res.redirect('/beers');
//     })
// }

function show(req, res){
    Beer.findById(req.params.id, function(err, beer) {
        res.render('beers/show', { title: 'Beer Details', beer })
    });
}

function index(req, res) {
    Beer.find({}, function(err, beers) {
        res.render('beers/index', { title: 'All Beers', beers });
    });
}

function newBeer(req, res){
    res.render('beers/new', { title: 'Add Beer' });
}

function create(req, res) {
    const beer = new Beer(req.body);
    beer.save(function(err) {
        if (err) return res.redirect('/beers/new');
        console.log(beer);
        res.redirect('/beers');
    });
}
