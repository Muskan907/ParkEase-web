const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account'
 }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/user/login' }),
  (req, res) => {
    req.session.userId = req.user._id;  
    res.redirect('/user/home')
  }
);

router.get('/facebook', passport.authenticate('facebook', {
    scope: [],
    authType: 'rerequest',   // forces re-approval if needed
    display: 'popup'          // forces account chooser popup
}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/user/login' }),
  (req, res) => {
    req.session.userId = req.user._id;  
    res.redirect('/user/home')
  }
);

module.exports = router;
