// const express = require('express');
// const router = express.Router(); 
// const upload = require('../utils/multer');   
// const adminController = require('../controllers/adminController');
// const Admin = require('../models/admin');
// const User = require('../models/user');

// const isAuthenticated = (req, res, next) => {
//     if (!req.session.adminId) {
//         return res.redirect('/admin/login');
//     }
//     next();
// };

// const { ensureAdminAuthenticated } = require('../middlewares/adminAuth');

// router.get('/dashboard', ensureAdminAuthenticated, adminController.getParkingSlot);
// router.post('/addSlot', ensureAdminAuthenticated, adminController.postParkingSlot);

// router.get('/login', adminController.loginPage);
// router.post('/login', adminController.postLogin);
// router.get('/register', adminController.registerPage);
// router.post('/register', adminController.register);


// router.get('/logout', adminController.logout);

// router.get('/dashboard', isAuthenticated, adminController.getParkingSlot);

// router.get('/addSlot', isAuthenticated, (req, res) => {
//     res.render('addSlot');
// });

// router.post('/slot',upload.single('image'), isAuthenticated, adminController.postParkingSlot);
// router.get('/slot', isAuthenticated, adminController.getParkingSlot);
// router.get('/slot/:id/edit', isAuthenticated, adminController.editSlotForm);
// router.post('/slot/:id/edit',upload.single('image'), isAuthenticated, adminController.updateParkingSlot);
// router.get('/slot/:id/delete', isAuthenticated, adminController.deleteParkingSlot);

// router.get('/booking', adminController.viewBookings);
// router.get('/users', adminController.viewUsers);

// router.get('/chat', isAuthenticated, async (req, res) => {
//     try {
//         const admin = await Admin.findById(req.session.adminId).lean();
//         if (!admin) return res.redirect('/admin/login');

//         const users = await User.find({}, 'username _id').lean(); 

//         res.render('adminChat', { username: admin.username, users });
//     } catch (err) {
//         console.error("Error loading chat page:", err);
//         res.status(500).send("Internal Server Error");
//     }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router(); 
// const upload = require('../utils/multer');   
// const adminController = require('../controllers/adminController');
// const Admin = require('../models/admin');
// const User = require('../models/user');

// // ✅ Only keep ONE middleware
// const ensureAdminAuthenticated = async (req, res, next) => {
//     if (!req.session.adminId) {
//         return res.redirect('/admin/login');
//     }
//     try {
//         const admin = await Admin.findById(req.session.adminId);
//         if (!admin) return res.redirect('/admin/login');
//         next();
//     } catch (err) {
//         console.error("Auth error:", err);
//         res.status(500).send("Server error");
//     }
// };

// // ---------------- ROUTES ----------------

// // Dashboard
// router.get('/dashboard', ensureAdminAuthenticated, adminController.getParkingSlot);

// // Slot management
// router.get('/addSlot', ensureAdminAuthenticated, (req, res) => res.render('addSlot'));
// router.post('/addSlot', upload.single('image'), ensureAdminAuthenticated, adminController.postParkingSlot);
// router.get('/slot', ensureAdminAuthenticated, adminController.getParkingSlot);
// router.post('/slot', upload.single('image'), ensureAdminAuthenticated, adminController.postParkingSlot);
// router.get('/slot/:id/edit', ensureAdminAuthenticated, adminController.editSlotForm);
// router.post('/slot/:id/edit', upload.single('image'), ensureAdminAuthenticated, adminController.updateParkingSlot);
// router.get('/slot/:id/delete', ensureAdminAuthenticated, adminController.deleteParkingSlot);

// // Auth
// router.get('/login', adminController.loginPage);
// router.post('/login', adminController.postLogin);

// // Resend Code
// router.post('/resendCode', adminController.resendCode);

// // ✅ Secure register route (requires secret)
// // router.post('/register', async (req, res) => {
// //     if (req.body.secret !== process.env.ADMIN_SECRET) {
// //         return res.status(403).send("Not allowed");
// //     }
// //     await adminController.register(req, res);
// // });
// router.post('/register', adminController.register);

// router.get('/logout', adminController.logout);

// // View bookings & users
// router.get('/booking', ensureAdminAuthenticated, adminController.viewBookings);
// router.get('/users', ensureAdminAuthenticated, adminController.viewUsers);

// // Show Register Page
// router.get('/register', (req, res) => {
//     res.render('register');  // make sure you have views/register.hbs
// });

// // Chat
// router.get('/chat', ensureAdminAuthenticated, async (req, res) => {
//     try {
//         const admin = await Admin.findById(req.session.adminId).lean();
//         if (!admin) return res.redirect('/admin/login');

//         const users = await User.find({}, 'username _id').lean(); 
//         res.render('adminChat', { username: admin.username, users });
//     } catch (err) {
//         console.error("Error loading chat page:", err);
//         res.status(500).send("Internal Server Error");
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router(); 
const upload = require('../utils/multer');   
const adminController = require('../controllers/adminController');
const Admin = require('../models/admin');
const User = require('../models/user');

// Middleware to check authentication
const ensureAdminAuthenticated = async (req, res, next) => {
  if (!req.session.adminId) return res.redirect('/admin/login');
  try {
    const admin = await Admin.findById(req.session.adminId);
    if (!admin) return res.redirect('/admin/login');
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).send("Server error");
  }
};

// Dashboard
router.get('/dashboard', ensureAdminAuthenticated, adminController.getParkingSlot);

// Slot routes
router.get('/addSlot', ensureAdminAuthenticated, (req, res) => res.render('addSlot'));
router.post('/addSlot', upload.single('image'), ensureAdminAuthenticated, adminController.postParkingSlot);
router.get('/slot', ensureAdminAuthenticated, adminController.getParkingSlot);
router.post('/slot', upload.single('image'), ensureAdminAuthenticated, adminController.postParkingSlot);
router.get('/slot/:id/edit', ensureAdminAuthenticated, adminController.editSlotForm);
router.post('/slot/:id/edit', upload.single('image'), ensureAdminAuthenticated, adminController.updateParkingSlot);
router.get('/slot/:id/delete', ensureAdminAuthenticated, adminController.deleteParkingSlot);

// Auth
router.get('/login', adminController.loginPage);
router.post('/login', adminController.postLogin);

// OTP resend
// router.post('/resendCode', adminController.resendCode);

// Registration (no secret required)
// router.post('/register', adminController.register);
// router.get('/register', (req, res) => res.render('register'));
// Registration
router.get('/register', adminController.registerPage);
router.post('/register', adminController.register);

// Logout
router.get('/logout', adminController.logout);

// View bookings & users
router.get('/booking', ensureAdminAuthenticated, adminController.viewBookings);
router.get('/users', ensureAdminAuthenticated, adminController.viewUsers);

// Chat
router.get('/chat', ensureAdminAuthenticated, async (req, res) => {
  try {
    const admin = await Admin.findById(req.session.adminId).lean();
    if (!admin) return res.redirect('/admin/login');
    const users = await User.find({}, 'username _id').lean(); 
    res.render('adminChat', { username: admin.username, users });
  } catch (err) {
    console.error("Error loading chat page:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
