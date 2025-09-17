// const mongoose = require('mongoose');
// const bookingSchema = new mongoose.Schema({
//     slotId: mongoose.Schema.Types.ObjectId,
//     location: String,
//     bookingTime: String,
//     price: Number
// });

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     googleId: String,
//     facebookId: String,
//     password: String,
//     bookings: [{
//         location: String,
//         bookingTime: String,
//         duration: String
//     }]
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userBookingSchema = new mongoose.Schema({
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin.slots' },
  location: String,
  bookingTime: Date,
  duration: Number,
  price: Number
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  googleId: String,
  facebookId: String,
  password: String,
  bookings: [userBookingSchema]
});

module.exports = mongoose.model('User', userSchema);
