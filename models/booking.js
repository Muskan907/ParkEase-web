// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const bookingSchema = new Schema({
//     userId:String,
//     slotId:String,
//     startTime:Date,
//     endTime:Date,
//     paymentId:String,
//     totalPrice:String,
//     phone: String,
//   carModel: String,
//   carNumber: String,
//   address: String
// });

// module.exports = mongoose.model('booking',bookingSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slotId: { type: mongoose.Schema.Types.ObjectId },
  startTime: Date,
  endTime: Date,
  paymentId: String,
  totalPrice: Number,
  phone: String,
  carModel: String,
  carNumber: String,
  address: String
});

module.exports = mongoose.model('Booking', bookingSchema);
