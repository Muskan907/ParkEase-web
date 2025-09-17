// const Admin = require('../models/admin');
// const User = require('../models/user');
// const nodemailer = require('nodemailer');

// module.exports.postParkingSlot = async (req, res) => {
//     const { price, availableSlot, totalSlot, location, description, imageUrl } = req.body;

//     const admin = await Admin.findById(req.session.adminId);
//     if (!admin) {
//         return res.status(404).send('Admin not found!');
//     }

//     admin.slots.push({
//         price: Number(price),
//         availableSlot: Number(availableSlot),
//         totalSlot: Number(totalSlot),
//         location,
//         description,
//         imageUrl
//     });

//     await admin.save(); 

//     res.redirect('/admin/dashboard');
// };

// // module.exports.postLogin = async (req, res) => {
// //     const { username, password } = req.body;
// //     const admin = await Admin.findOne({ username, password });

// //     if (!admin) {
// //         return res.render('login', { error: 'Invalid credentials' });
// //     }

// //     req.session.adminId = admin._id; 
// //     res.redirect('/admin/dashboard');
// // };
// module.exports.postLogin = async (req, res) => {
//     const { username, password, loginCode } = req.body;
//     const admin = await Admin.findOne({ username, password });

//     if (!admin) {
//         return res.render('login', { error: 'Invalid credentials' });
//     }

//     if (admin.loginCode !== loginCode) {
//         return res.render('login', { error: 'Invalid special code' });
//     }

//     req.session.adminId = admin._id;
//     res.redirect('/admin/dashboard');
// };
// // const loginCode = Math.floor(100000 + Math.random() * 900000).toString();
// // const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

// // const newAdmin = new Admin({
// //     username,
// //     password,
// //     gmail,
// //     phone,
// //     loginCode,
// //     loginCodeExpires: expiry,
// //     slots: []
// // });

// module.exports.getParkingSlot = async (req, res) => {
//     const admin = await Admin.findById(req.session.adminId).lean();
//     if (!admin) return res.redirect('/admin/login');

//     res.render('adminDashboard', {
//         slots: admin.slots,
//         username: admin.username
//     });
// };

// module.exports.deleteParkingSlot = async (req, res) => {
//     const admin = await Admin.findById(req.session.adminId);
//     if (!admin) return res.redirect('/admin/login');

//     admin.slots = admin.slots.filter(slot => slot._id.toString() !== req.params.id);
//     await admin.save();

//     res.redirect('/admin/dashboard');
// };

// module.exports.editSlotForm = async (req, res) => {
//     const admin = await Admin.findById(req.session.adminId).lean();
//     if (!admin) return res.redirect('/admin/login');

//     const slot = admin.slots.find(slot => slot._id.toString() === req.params.id);
//     if (!slot) return res.status(404).send('Slot not found');

//     res.render('editSlot', { slot });
// };

// module.exports.updateParkingSlot = async (req, res) => {
//     const { price, availableSlot, totalSlot, location, description, imageUrl } = req.body;
//     const admin = await Admin.findById(req.session.adminId);

//     const slot = admin.slots.id(req.params.id);
//     if (!slot) return res.status(404).send('Slot not found');

//     slot.price = Number(price);
//     slot.availableSlot = Number(availableSlot);
//     slot.totalSlot = Number(totalSlot);
//     slot.location = location;
//     slot.description = description;
//     slot.imageUrl = imageUrl;

//     if(req.file){
//         slot.imageUrl = '/uploads/' + req.file.filename;
//     }

//     await admin.save();
//     res.redirect('/admin/dashboard');
// };

// // Login
// module.exports.postLogin = async (req, res) => {
//     const { username, password, loginCode } = req.body;
//     const admin = await Admin.findOne({ username, password });

//     if (!admin) return res.render('login', { error: 'Invalid credentials' });

//     if (!admin.loginCode || admin.loginCode !== loginCode) {
//         return res.render('login', { error: 'Invalid or missing login code' });
//     }

//     if (Date.now() > admin.loginCodeExpires) {
//         return res.render('login', { error: 'Code expired. Please resend a new one.' });
//     }

//     // ✅ Invalidate after one use
//     admin.loginCode = null;
//     admin.loginCodeExpires = null;
//     await admin.save();

//     req.session.adminId = admin._id;
//     res.redirect('/admin/dashboard');
// };


// // Resend Code
// module.exports.resendCode = async (req, res) => {
//     const { username } = req.body;
//     const admin = await Admin.findOne({ username });
//     if (!admin) return res.render('login', { error: 'User not found' });

//     const loginCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiry = Date.now() + 10 * 60 * 1000;

//     admin.loginCode = loginCode;
//     admin.loginCodeExpires = expiry;
//     await admin.save();

//     await transporter.sendMail({
//         from: `"Parking System" <${process.env.SMTP_USER}>`,
//         to: admin.gmail,
//         subject: "Your New Admin Login Code",
//         text: `Hello ${admin.username},\n\nHere is your new login code: ${loginCode}\n\nIt will expire in 10 minutes.`
//     });

//     res.render('login', { error: 'New code sent to your email' });
// };

// module.exports.logout = async (req, res) => {
//     const admin = await Admin.findById(req.session.adminId).lean();
//     const username = admin ? admin.username : 'Admin';
//     req.session.destroy(() => {
//         res.redirect('/?logoutMessage=Logging out as ' + username);
//     });
// };

// module.exports.loginPage = (req, res) => res.render('login');

// module.exports.registerPage = (req, res) => {
//     res.render('register');  
// };

// // module.exports.register = async (req, res) => {
// //     const { username, password } = req.body;

// //     const existingAdmin = await Admin.findOne({ username });
// //     if (existingAdmin) {
// //         return res.render('register', { error: 'Username already exists!' });
// //     }

// //     const newAdmin = new Admin({ username, password, slots: [] });
// //     await newAdmin.save();
// //     res.redirect('/admin/login');
// // };
// // module.exports.register = async (req, res) => {
// //     const { username, password, gmail, phone } = req.body;

// //     const existingAdmin = await Admin.findOne({ $or: [{ username }, { gmail }, { phone }] });
// //     if (existingAdmin) {
// //         return res.render('register', { error: 'Admin with this username/email/phone already exists!' });
// //     }

// //     // Generate special login code
// //     const loginCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

// //     const newAdmin = new Admin({
// //         username,
// //         password,
// //         gmail,
// //         phone,
// //         loginCode,
// //         slots: []
// //     });

// //     await newAdmin.save();

// //     // Send email with nodemailer
// //     const transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //             user: process.env.SMTP_USER,   // your gmail
// //             pass: process.env.SMTP_PASS    // app password
// //         }
// //     });

// //     await transporter.sendMail({
// //         from: `"Parking System" <${process.env.SMTP_USER}>`,
// //         to: gmail,
// //         subject: "Your Admin Login Code",
// //         text: `Hello ${username},\n\nHere is your special login code: ${loginCode}\n\nUse this code to log in to the admin dashboard.`
// //     });

// //     res.redirect('/admin/login');
// // };
// // ✅ transporter (re-use this anywhere you send email)
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//     }
// });

// // module.exports.register = async (req, res) => {
// //     const { username, password, gmail, phone } = req.body;

// //     const loginCode = Math.floor(100000 + Math.random() * 900000).toString();
// //     const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

// //     const newAdmin = new Admin({
// //         username,
// //         password,
// //         gmail,
// //         phone,
// //         loginCode,
// //         loginCodeExpires: expiry,
// //         slots: []
// //     });

// //     await newAdmin.save();

// //     // Send code to email
// //     await transporter.sendMail({
// //         from: `"Parking System" <${process.env.SMTP_USER}>`,
// //         to: gmail,
// //         subject: "Your Admin Login Code",
// //         text: `Hello ${username},\n\nHere is your login code: ${loginCode}\n\nIt will expire in 10 minutes.`
// //     });

// //     res.render("login", { error: "Admin registered. Please check your email for the login code." });
// // };
// module.exports.register = async (req, res) => {
//     try {
//         const { username, password, gmail, phone } = req.body;

//         const existingAdmin = await Admin.findOne({ $or: [{ username }, { gmail }, { phone }] });
//         if (existingAdmin) {
//             return res.render('register', { error: 'Admin already exists!' });
//         }

//         const loginCode = Math.floor(100000 + Math.random() * 900000).toString();
//         const expiry = Date.now() + 10 * 60 * 1000;

//         const newAdmin = new Admin({ username, password, gmail, phone, loginCode, loginCodeExpires: expiry, slots: [] });
//         await newAdmin.save();

//         try {
//             await transporter.sendMail({
//                 from: `"Parking System" <${process.env.SMTP_USER}>`,
//                 to: gmail,
//                 subject: "Your Admin Login Code",
//                 text: `Hello ${username},\nYour login code is: ${loginCode}`
//             });
//         } catch (err) {
//             console.error("Email sending error:", err);
//         }

//         res.render("login", { error: "Admin registered. Check your email for the code." });
//     } catch (err) {
//         console.error("Register error:", err);
//         res.status(500).send("Server error during registration");
//     }
// };



// module.exports.viewBookings = async (req, res) => {
//     try {
//         const admin = await Admin.findById(req.session.adminId).lean();
//         if (!admin) return res.redirect('/admin/login');

//         const bookings = [];

//         admin.slots.forEach(slot => {
//             if (!slot.bookedUsers) return;
//             slot.bookedUsers.forEach(booking => {
//                 bookings.push({
//                     location: slot.location,
//                     bookingTime: booking.bookingTime,
//                     username: booking.username,
//                     duration: booking.duration
//                 });
//             });
//         });

//         res.render('adminBookings', { bookings, username: admin.username });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// };

// module.exports.viewUsers = async (req, res) => {
//     try {
//         const admin = await Admin.findById(req.session.adminId).lean();
//         if (!admin) return res.redirect('/admin/login');

//         const adminSlotLocations = admin.slots.map(slot => slot.location); 

//         const users = await User.find({
//             bookings: {
//                 $elemMatch: {location: { $in: adminSlotLocations }}
//             }
//         }).lean();

//         res.render('adminUsers', { users, username: admin.username  });

//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching users');
//     }
// };
// just select the above all and comment out


const Admin = require('../models/admin');
const User = require('../models/user');
const nodemailer = require('nodemailer');

// ------------------------
// Nodemailer transporter
// ------------------------
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//     }
// });
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.OTP_EMAIL_USER,
        pass: process.env.OTP_EMAIL_PASS
    }
});

// ------------------------
// Admin registration
// ------------------------
// module.exports.register = async (req, res) => {
//     try {
//         const { username, password, gmail, phone, fixedOtp } = req.body;

//         const existingAdmin = await Admin.findOne({ $or: [{ username }, { gmail }, { phone }] });
//         if (existingAdmin) {
//             return res.render('register', { error: 'Admin already exists!' });
//         }

//         // Use fixed OTP for the admin
//         const newAdmin = new Admin({
//             username,
//             password,
//             gmail,
//             phone,
//             otp: fixedOtp, // fixed OTP
//             slots: []
//         });

//         await newAdmin.save();

//         // Send the fixed OTP via email once
//         await transporter.sendMail({
//             from: `"Parking System" <${process.env.SMTP_USER}>`,
//             to: gmail,
//             subject: "Your Admin Login OTP",
//             text: `Hello ${username},\nYour login OTP is: ${fixedOtp}`
//         });

//         res.render("login", { error: "Admin registered. Check your email for OTP." });
//     } catch (err) {
//         console.error("Register error:", err);
//         res.status(500).send("Server error during registration");
//     }
// };
// module.exports.register = async (req, res) => {
//     try {
//         const { username, password, gmail, phone, fixedOtp } = req.body;

//         if (!fixedOtp) return res.render('register', { error: "OTP is required" });

//         const existingAdmin = await Admin.findOne({ $or: [{ username }, { gmail }, { phone }] });
//         if (existingAdmin) {
//             return res.render('register', { error: 'Admin already exists!' });
//         }

//         const newAdmin = new Admin({
//             username,
//             password,
//             gmail,
//             phone,
//             otp: fixedOtp,
//             slots: []
//         });

//         await newAdmin.save();

//         // Send OTP via email
//         await transporter.sendMail({
//     from: `"Parking System" <${process.env.OTP_EMAIL_USER}>`,
//     to: gmail,
//     subject: "Your Admin Login OTP",
//     text: `Hello ${username},\nYour login OTP is: ${fixedOtp}`
// });


//         res.render("login", { error: "Admin registered. Check your email for OTP." });

//     } catch (err) {
//         console.error("Register error:", err);
//         res.status(500).send("Server error during registration");
//     }
// };
module.exports.register = async (req, res) => {
    try {
        const { username, password, gmail, phone } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { gmail }, { phone }] });
        if (existingAdmin) {
            return res.render('register', { error: 'Admin already exists!' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

        // Save admin with OTP (never expires)
        const newAdmin = new Admin({
            username,
            password,
            gmail,
            phone,
            otp, // store OTP
            slots: []
        });
        await newAdmin.save();

        // Send OTP via email
        await transporter.sendMail({
            from: `"ParkEase System" <${process.env.SMTP_USER}>`,
            to: gmail,
            subject: "Your Admin OTP for ParkEase Login",
            text: `Hello ${username},\nYour login OTP is: ${otp}\nUse this OTP along with your password to login.`
        });

        res.render("login", { error: "Registered! Check your email for OTP." });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).send("Server error during registration");
    }
};


// ------------------------
// Admin login with fixed OTP
// ------------------------
// module.exports.postLogin = async (req, res) => {
//     const { username, password, otp } = req.body;

//     const admin = await Admin.findOne({ username, password });
//     if (!admin) return res.render('login', { error: 'Invalid username or password' });

//     if (admin.otp !== otp) return res.render('login', { error: 'Invalid OTP' });

//     req.session.adminId = admin._id;
//     res.redirect('/admin/dashboard');
// };
// module.exports.postLogin = async (req, res) => {
//     const { username, password, otp } = req.body;

//     const admin = await Admin.findOne({ username, password });
//     if (!admin) return res.render('login', { error: 'Invalid username or password' });

//     if (!otp || admin.otp !== otp) return res.render('login', { error: 'Invalid OTP' });

//     // OTP is used at login, but it never expires
//     req.session.adminId = admin._id;
//     res.redirect('/admin/dashboard');
// };
module.exports.postLogin = async (req, res) => {
    try {
        const { username, password, otp } = req.body;

        const admin = await Admin.findOne({ username, password });
        if (!admin) return res.render('login', { error: 'Invalid username or password' });

        // Compare OTP as strings and trim whitespace
        if (!otp || admin.otp.toString().trim() !== otp.toString().trim()) {
            console.log("Entered OTP:", otp);
            console.log("Stored OTP:", admin.otp);
            return res.render('login', { error: 'Invalid OTP' });
        }

        // Login success
        req.session.adminId = admin._id;
        res.redirect('/admin/dashboard');

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Server error during login");
    }
};


// ------------------------
// Parking slots CRUD
// ------------------------
module.exports.postParkingSlot = async (req, res) => {
    const { price, availableSlot, totalSlot, location, description, imageUrl } = req.body;

    const admin = await Admin.findById(req.session.adminId);
    if (!admin) return res.status(404).send('Admin not found!');

    admin.slots.push({ price: Number(price), availableSlot: Number(availableSlot), totalSlot: Number(totalSlot), location, description, imageUrl });
    await admin.save();
    res.redirect('/admin/dashboard');
};

module.exports.getParkingSlot = async (req, res) => {
    const admin = await Admin.findById(req.session.adminId).lean();
    if (!admin) return res.redirect('/admin/login');

    res.render('adminDashboard', { slots: admin.slots, username: admin.username });
};

module.exports.deleteParkingSlot = async (req, res) => {
    const admin = await Admin.findById(req.session.adminId);
    if (!admin) return res.redirect('/admin/login');

    admin.slots = admin.slots.filter(slot => slot._id.toString() !== req.params.id);
    await admin.save();
    res.redirect('/admin/dashboard');
};

module.exports.editSlotForm = async (req, res) => {
    const admin = await Admin.findById(req.session.adminId).lean();
    if (!admin) return res.redirect('/admin/login');

    const slot = admin.slots.find(slot => slot._id.toString() === req.params.id);
    if (!slot) return res.status(404).send('Slot not found');

    res.render('editSlot', { slot });
};

module.exports.updateParkingSlot = async (req, res) => {
    const { price, availableSlot, totalSlot, location, description, imageUrl } = req.body;
    const admin = await Admin.findById(req.session.adminId);

    const slot = admin.slots.id(req.params.id);
    if (!slot) return res.status(404).send('Slot not found');

    slot.price = Number(price);
    slot.availableSlot = Number(availableSlot);
    slot.totalSlot = Number(totalSlot);
    slot.location = location;
    slot.description = description;
    slot.imageUrl = req.file ? '/uploads/' + req.file.filename : imageUrl;

    await admin.save();
    res.redirect('/admin/dashboard');
};

// ------------------------
// Admin logout
// ------------------------
module.exports.logout = (req, res) => {
    const username = req.session.adminId ? req.session.adminId : 'Admin';
    req.session.destroy(() => {
        res.redirect('/?logoutMessage=Logging out as ' + username);
    });
};

// ------------------------
// Admin pages
// ------------------------
module.exports.loginPage = (req, res) => res.render('login');
module.exports.registerPage = (req, res) => res.render('register');

// ------------------------
// View bookings
// ------------------------
module.exports.viewBookings = async (req, res) => {
    const admin = await Admin.findById(req.session.adminId).lean();
    if (!admin) return res.redirect('/admin/login');

    const bookings = [];
    admin.slots.forEach(slot => {
        if (!slot.bookedUsers) return;
        slot.bookedUsers.forEach(booking => {
            bookings.push({ location: slot.location, bookingTime: booking.bookingTime, username: booking.username, duration: booking.duration });
        });
    });

    res.render('adminBookings', { bookings, username: admin.username });
};

// ------------------------
// View users
// ------------------------
module.exports.viewUsers = async (req, res) => {
    const admin = await Admin.findById(req.session.adminId).lean();
    if (!admin) return res.redirect('/admin/login');

    const adminSlotLocations = admin.slots.map(slot => slot.location);
    const users = await User.find({ bookings: { $elemMatch: { location: { $in: adminSlotLocations } } } }).lean();

    res.render('adminUsers', { users, username: admin.username });
};
