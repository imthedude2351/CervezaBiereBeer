const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/beers');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/beers',
    failureRedirect: '/beers'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/beers');
});

module.exports = router;
