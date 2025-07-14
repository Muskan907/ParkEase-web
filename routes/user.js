const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth');
const Booking = require('../models/booking');

router.get('/', (req, res) => {
    const user = req.user || req.session.user;
    const userId = req.session.userId;

    res.render('userHome', {
        layout: false,
        user: user || {},
        userId: userId
    });
});


router.get('/login-options', (req, res) => {
    res.render('loginOptions', { title: 'Login Options' });
});

router.get('/login', userController.loginPage);
router.post('/login', userController.login);
router.get('/register', userController.registerPage);
router.post('/register', userController.register);

router.get('/logout', userController.logout);
router.get('/dashboard', ensureAuthenticated, userController.getDashboard);
router.get('/bookings', ensureAuthenticated, userController.bookingHistory);
router.get('/profile', ensureAuthenticated, userController.profile);
router.post('/book', ensureAuthenticated, userController.bookSlot);
router.get('/confirmation', ensureAuthenticated, userController.confirmation);
router.get('/home', ensureAuthenticated, userController.getUserHome);

router.get('/slot/:id', ensureAuthenticated, userController.viewSlotDetails);
router.post('/slot/:id/review', ensureAuthenticated, userController.addReview);
router.post('/slot/:id/book', ensureAuthenticated, userController.bookFromDetails);

router.get('/fill-details', ensureAuthenticated, (req, res) => {
  const temp = req.session.tempBooking;
  console.log("Temp booking session:", temp);
  if (!temp) return res.redirect('/user/home');

  res.render('fillDetailsForm', {
    layout: 'userMain',
    slotId: temp.slotId,
    startTime: temp.startTime,
    endTime: temp.endTime,
    totalPrice: temp.totalPrice
  });
});


router.post('/fill-details', ensureAuthenticated, userController.submitBookingDetails);

router.get('/chat', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.render('userChat', { userId: req.session.userId });
});

module.exports = router;
