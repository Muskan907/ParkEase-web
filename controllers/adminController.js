const Admin = require('../models/admin');
const User = require('../models/user');

module.exports.postParkingSlot = async (req, res) => {
    const { price, availableSlot, totalSlot, location, description, imageUrl } = req.body;

    const admin = await Admin.findById(req.session.adminId);
    if (!admin) {
        return res.status(404).send('Admin not found!');
    }

    admin.slots.push({
        price: Number(price),
        availableSlot: Number(availableSlot),
        totalSlot: Number(totalSlot),
        location,
        description,
        imageUrl
    });

    await admin.save(); 

    res.redirect('/admin/dashboard');
};

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
        return res.render('login', { error: 'Invalid credentials' });
    }

    req.session.adminId = admin._id; 
    res.redirect('/admin/dashboard');
};

module.exports.getParkingSlot = async (req, res) => {
    const admin = await Admin.findById(req.session.adminId).lean();
    if (!admin) return res.redirect('/admin/login');

    res.render('adminDashboard', {
        slots: admin.slots,
        username: admin.username
    });
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
    slot.imageUrl = imageUrl;

    if(req.file){
        slot.imageUrl = '/uploads/' + req.file.filename;
    }

    await admin.save();
    res.redirect('/admin/dashboard');
};

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
        return res.render('login', { error: 'Invalid credentials' });
    }

    req.session.adminId = admin._id;
    res.redirect('/admin/dashboard');
};

module.exports.logout = async (req, res) => {
    const admin = await Admin.findById(req.session.adminId).lean();
    const username = admin ? admin.username : 'Admin';
    req.session.destroy(() => {
        res.redirect('/?logoutMessage=Logging out as ' + username);
    });
};

module.exports.loginPage = (req, res) => res.render('login');

module.exports.registerPage = (req, res) => {
    res.render('register');  
};

module.exports.register = async (req, res) => {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        return res.render('register', { error: 'Username already exists!' });
    }

    const newAdmin = new Admin({ username, password, slots: [] });
    await newAdmin.save();
    res.redirect('/admin/login');
};

module.exports.viewBookings = async (req, res) => {
    try {
        const admin = await Admin.findById(req.session.adminId).lean();
        if (!admin) return res.redirect('/admin/login');

        const bookings = [];

        admin.slots.forEach(slot => {
            if (!slot.bookedUsers) return;
            slot.bookedUsers.forEach(booking => {
                bookings.push({
                    location: slot.location,
                    bookingTime: booking.bookingTime,
                    username: booking.username,
                    duration: booking.duration
                });
            });
        });

        res.render('adminBookings', { bookings, username: admin.username });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.viewUsers = async (req, res) => {
    try {
        const admin = await Admin.findById(req.session.adminId).lean();
        if (!admin) return res.redirect('/admin/login');

        const adminSlotLocations = admin.slots.map(slot => slot.location); 

        const users = await User.find({
            bookings: {
                $elemMatch: {location: { $in: adminSlotLocations }}
            }
        }).lean();

        res.render('adminUsers', { users, username: admin.username  });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
};