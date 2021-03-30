const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const isLoggedIn = require('../config/auth');

router.post('/beers/:id/reviews', isLoggedIn, reviewsCtrl.create);
router.put('/reviews/:id', isLoggedIn, reviewsCtrl.update);
router.delete('/reviews/:id', isLoggedIn, reviewsCtrl.delete);

module.exports = router;