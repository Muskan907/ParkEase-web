const bcrypt = require('bcrypt');
const User = require('../models/user');
const Admin = require('../models/admin'); 
const { sendConfirmationEmail } = require('../utils/mailer');
const Booking = require('../models/booking');

module.exports.registerPage = (req, res) => res.render('userRegister', { layout: 'userMain' });

// module.exports.register = async (req, res) => {
//     const { username, password, email } = req.body;
//     const exists = await User.findOne({ username });
//     if (exists) return res.render('userRegister', { layout: 'userMain', error: 'Username exists' });

//     const user = new User({ username, password, email, bookings: [] });
//     await user.save();
//     res.redirect('/user/login');
// };
module.exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // 1️⃣ Check if username/email exists
        const exists = await User.findOne({ $or: [{ username }, { email }] });
        if (exists) {
            return res.render('userRegister', { 
                layout: 'userMain', 
                error: 'Username or email already exists',
                username,
                email
            });
        }

        // 2️⃣ Validate password
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.render('userRegister', { 
                layout: 'userMain', 
                error: 'Password must be at least 8 characters long and include a number and a special character.',
                username,
                email
            });
        }

        // 3️⃣ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Save user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            bookings: []
        });
        await user.save();

        res.redirect('/user/login');

    } catch (err) {
        console.error(err);
        res.render('userRegister', { 
            layout: 'userMain', 
            error: 'Something went wrong. Please try again.',
            username: req.body.username,
            email: req.body.email
        });
    }
};

module.exports.loginPage = (req, res) => res.render('userLogin', { layout: 'userMain' });

// module.exports.login = async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username, password });
//     if (!user) return res.render('userLogin', { layout: 'userMain', error: 'Invalid credentials' });

//     req.session.userId = user._id;
//     res.redirect('/user/home');
// };
module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1️⃣ Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('userLogin', { layout: 'userMain', error: 'Invalid credentials' });
        }

        // 2️⃣ Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('userLogin', { layout: 'userMain', error: 'Invalid credentials' });
        }

        // 3️⃣ Login successful
        req.session.userId = user._id;
        res.redirect('/user/home');

    } catch (err) {
        console.error(err);
        res.render('userLogin', { layout: 'userMain', error: 'Something went wrong. Please try again.' });
    }
};

module.exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/?logoutMessage=User Logged Out!');
    });
};

module.exports.getUserHome = async (req, res) => {
    try {
        const admins = await Admin.find().lean();
        const slots = admins.flatMap(admin => admin.slots || []);
        let bookings = [];

        if (req.session.userId) {
            const user = await User.findById(req.session.userId).lean();
            bookings = user ? user.bookings : [];
        }

        res.render('userHome', { layout: false, slots, bookings, userId: req.session.userId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.getDashboard = async (req, res) => {
    try {
        const admins = await Admin.find().lean();
        const slots = admins.flatMap(admin => admin.slots || []);

        const username = req.user ? req.user.username : 'Guest';
        res.render('userDashboard', {
            layout: 'userMain',
            title: 'User Dashboard',
            username,
            slots
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.confirmation = (req, res) => {
    const { bookingTime, location } = req.session.confirmation || {};
    res.render('userBookingConfirmation', { layout: 'userMain', bookingTime, location });
};

// module.exports.bookSlot = async (req, res) => {
//     const { slotId, date, time, duration } = req.body;
//     const user = await User.findById(req.session.userId);
//     const adminWithSlot = await Admin.findOne({ "slots._id": slotId });

//     if (!adminWithSlot) return res.status(404).send("Slot not found.");
//     if (!req.session.userId) return res.redirect('/user/login');

//     const slot = adminWithSlot.slots.id(slotId);
//     if (slot.availableSlot <= 0) return res.send("No slots available.");

//     slot.availableSlot--;
//     slot.bookedUsers.push({
//         userId: user._id,
//         username: user.username,
//         bookingTime: `${date} ${time}`,
//         duration
//     });

//     await adminWithSlot.save();

//     user.bookings.push({
//         slotId: slot._id,
//         location: slot.location,
//         bookingTime: `${date} ${time}`,
//         price: slot.price
//     });

//     await sendConfirmationEmail(
//         user.email,
//         user.username,
//         {
//             date: date,
//             time: time,
//             slotName: slot.location
//         }
//     );

//     await user.save();

//     req.session.confirmation = { bookingTime: `${date} ${time}`, location: slot.location };
//     res.redirect('/user/confirmation');
// };
module.exports.bookSlot = async (req, res) => {
    const { slotId, date, time, duration } = req.body;

    if (!req.session.userId) return res.redirect('/user/login');
    const user = await User.findById(req.session.userId);
    const adminWithSlot = await Admin.findOne({ "slots._id": slotId });

    if (!adminWithSlot) return res.status(404).send("Slot not found.");

    const slot = adminWithSlot.slots.id(slotId);
    if (!slot || slot.availableSlot <= 0) return res.send("No slots available.");

    // Calculate timings & price
    const startTime = new Date(`${date} ${time}`);
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
    const totalPrice = slot.price * duration;

    // Update Admin slot
    slot.availableSlot--;
    slot.bookedUsers.push({
        userId: user._id,
        username: user.username,
        bookingTime: startTime,
        duration
    });
    await adminWithSlot.save();

    // Update User booking history
    user.bookings.push({
        slotId: slot._id,
        location: slot.location,
        bookingTime: startTime,
        duration,
        price: totalPrice
    });
    await user.save();

    // Create a Booking document (centralized record)
    const booking = new Booking({
        userId: user._id,
        slotId: slot._id,
        startTime,
        endTime,
        totalPrice,
        phone: "",     // will be filled later in submitBookingDetails
        carModel: "",
        carNumber: "",
        address: ""
    });
    await booking.save();

    // Confirmation email
    await sendConfirmationEmail(user.email, user.username, {
        date,
        time,
        slotName: slot.location
    });

    // Save confirmation in session
    req.session.confirmation = { bookingTime: startTime, location: slot.location };
    res.redirect('/user/confirmation');
};


module.exports.bookingHistory = async (req, res) => {
    const user = await User.findById(req.session.userId).lean();
    res.render('userBookingHistory', { layout: 'userMain', bookings: user.bookings });
};

module.exports.profile = async (req, res) => {
    const user = await User.findById(req.session.userId).lean();
      if (!user) {
        return res.redirect('/user/login');  
    }

    res.render('userProfile', { layout: 'userMain', username: user.username, email: user.email });
};

module.exports.viewSlotDetails = async (req, res) => {
    const adminWithSlot = await Admin.findOne({ "slots._id": req.params.id }).lean();
    if (!adminWithSlot) return res.status(404).send('Slot not found');

    const slot = adminWithSlot.slots.find(s => s._id.toString() === req.params.id);
    if (!slot) return res.status(404).send('Slot not found');

    res.render('slotDetails', { layout: 'userMain', slot });
};

module.exports.addReview = async (req, res) => {
    const { rating, comment } = req.body;
    const adminWithSlot = await Admin.findOne({ "slots._id": req.params.id });

    const slot = adminWithSlot.slots.id(req.params.id);
    slot.reviews.push({
        userId: req.session.userId,
        username: (await User.findById(req.session.userId)).username,
        rating: Number(rating),
        comment
    });

    await adminWithSlot.save();
    res.redirect(`/user/slot/${req.params.id}`);
};

module.exports.bookFromDetails = async (req, res) => {
    const { date, time, duration } = req.body;
    const slotId = req.params.id;

    try {
        const user = await User.findById(req.session.userId);
        const adminWithSlot = await Admin.findOne({ "slots._id": slotId });

        if (!adminWithSlot) return res.status(404).send("Slot not found");

        const slot = adminWithSlot.slots.id(slotId);
        if (!slot || slot.availableSlot <= 0) return res.send("No slots available");

        const startTime = new Date(`${date} ${time}`);
        const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
        const totalPrice = slot.price * duration;

        req.session.tempBooking = {
            slotId: slot._id,
            slotLocation: slot.location,
            price: slot.price,
            startTime,
            endTime,
            duration,
            totalPrice
        };

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).send("Session failed");
            }
            res.redirect('/user/fill-details');
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error during booking");
    }
};

// module.exports.submitBookingDetails = async (req, res) => {
//   const { paymentId, phone, carModel, carNumber, address } = req.body;
//   const temp = req.session.tempBooking;

//   if (!temp) {
//     return res.redirect('/user/home');
//   }

//   try {
//     const booking = new Booking({
//       userId: req.session.userId,
//       slotId: temp.slotId,
//       startTime: new Date(temp.startTime),
//       endTime: new Date(temp.endTime),
//       paymentId,
//       totalPrice: temp.totalPrice,
//       phone,
//       carModel,
//       carNumber,
//       address
//     });

//     await booking.save();
//     req.session.tempBooking = null;

//     req.session.confirmation = {
//       bookingTime: temp.startTime,
//       location: temp.slotLocation
//     };
 
//     req.session.save(() => {
//       res.redirect('/user/confirmation');
//     });
   
//   } catch (err) {
//     console.error("Booking failed:", err);
//     res.status(500).send('Booking failed');
//   }
//   console.log("bookFromDetails route triggered");
// console.log("Form data:", req.body);
// };
module.exports.submitBookingDetails = async (req, res) => {
  const { paymentId, phone, carModel, carNumber, address } = req.body;
  const temp = req.session.tempBooking;

  if (!temp) return res.redirect('/user/home');

  try {
    const user = await User.findById(req.session.userId);
    const adminWithSlot = await Admin.findOne({ "slots._id": temp.slotId });
    if (!adminWithSlot) return res.status(404).send("Slot not found");

    const slot = adminWithSlot.slots.id(temp.slotId);

    // Create booking document
    const booking = new Booking({
      userId: user._id,
      slotId: slot._id,
      startTime: temp.startTime,
      endTime: temp.endTime,
      paymentId,
      totalPrice: temp.totalPrice,
      phone,
      carModel,
      carNumber,
      address
    });
    await booking.save();

    // Update User
    user.bookings.push({
      slotId: slot._id,
      location: slot.location,
      bookingTime: temp.startTime,
      duration: temp.duration,
      price: temp.totalPrice
    });
    await user.save();

    // Update Admin
    slot.bookedUsers.push({
      userId: user._id,
      username: user.username,
      bookingTime: temp.startTime,
      duration: temp.duration
    });
    await adminWithSlot.save();

    req.session.tempBooking = null;
    req.session.confirmation = {
      bookingTime: temp.startTime,
      location: slot.location
    };

    res.redirect('/user/confirmation');
  } catch (err) {
    console.error("Booking failed:", err);
    res.status(500).send('Booking failed');
  }
};
