const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/user/login' }),
  (req, res) => {
    req.session.userId = req.user._id;  
    res.redirect('/user/home')
  }
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/user/login' }),
  (req, res) => {
    req.session.userId = req.user._id;  
    res.redirect('/user/home')
  }
);

module.exports = router;
