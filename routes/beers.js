const express = require('express');
const router = express.Router();
const beersCtrl = require('../controllers/beers');

// GET /beers
router.get('/', beersCtrl.index);
// GET /beers/new 
router.get('/new', beersCtrl.new);
// POST /beers
router.post('/', beersCtrl.create);

module.exports = router;