const express = require('express');
const router = express.Router();
const beersCtrl = require('../controllers/beers');
const isLoggedIn = require('../config/auth');


// GET /beers
router.get('/', beersCtrl.index);
// GET /beers/new 
router.get('/new', isLoggedIn, beersCtrl.new);
// POST /beers
router.post('/', isLoggedIn, beersCtrl.create);
router.get('/:id', isLoggedIn, beersCtrl.show);

module.exports = router;