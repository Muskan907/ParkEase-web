const express = require('express');
const router = express.Router(); 
const upload = require('../utils/multer');   
const adminController = require('../controllers/adminController');

const isAuthenticated = (req, res, next) => {
    if (!req.session.adminId) {
        return res.redirect('/admin/login');
    }
    next();
};

const { ensureAdminAuthenticated } = require('../middlewares/adminAuth');

router.get('/dashboard', ensureAdminAuthenticated, adminController.getParkingSlot);
router.post('/addSlot', ensureAdminAuthenticated, adminController.postParkingSlot);

router.get('/login', adminController.loginPage);
router.post('/login', adminController.postLogin);
router.get('/register', adminController.registerPage);
router.post('/register', adminController.register);

router.get('/logout', adminController.logout);

router.get('/dashboard', isAuthenticated, adminController.getParkingSlot);

router.get('/addSlot', isAuthenticated, (req, res) => {
    res.render('addSlot');
});

router.post('/slot',upload.single('image'), isAuthenticated, adminController.postParkingSlot);
router.get('/slot', isAuthenticated, adminController.getParkingSlot);
router.get('/slot/:id/edit', isAuthenticated, adminController.editSlotForm);
router.post('/slot/:id/edit',upload.single('image'), isAuthenticated, adminController.updateParkingSlot);
router.get('/slot/:id/delete', isAuthenticated, adminController.deleteParkingSlot);

router.get('/booking', adminController.viewBookings);
router.get('/users', adminController.viewUsers);

module.exports = router;

