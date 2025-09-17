// // // // // const mongoose = require('mongoose');
// // // // // const slotSchema = new mongoose.Schema({
// // // // //     location: String,
// // // // //     price: Number,
// // // // //     availableSlot: Number,
// // // // //     totalSlot: Number,
// // // // //     description: String,
// // // // //     imageUrl: String,
// // // // //     bookedUsers: [{
// // // // //         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// // // // //         username: String,
// // // // //         bookingTime: String,
// // // // //         duration: String
// // // // //     }],
// // // // //     reviews:[{
// // // // //         userId:mongoose.Schema.Types.ObjectId,
// // // // //         username:String,
// // // // //         rating:Number,
// // // // //         comment:String,
// // // // //         createAt:{type:Date,default:Date.now}

// // // // //     }]
// // // // // });

// // // // // const adminSchema = new mongoose.Schema({
// // // // //     username: String,
// // // // //     password: String,
// // // // //     slots: [slotSchema]
// // // // // });

// // // // // const adminController = require('../controllers/adminController');
// // // // // module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
// // // // const mongoose = require('mongoose');

// // // // const slotSchema = new mongoose.Schema({
// // // //   location: String,
// // // //   price: Number,
// // // //   availableSlot: Number,
// // // //   totalSlot: Number,
// // // //   description: String,
// // // //   imageUrl: String,
// // // //   bookedUsers: [{
// // // //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// // // //     username: String,
// // // //     bookingTime: Date,
// // // //     duration: Number
// // // //   }],
// // // //   reviews:[{
// // // //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// // // //     username: String,
// // // //     rating: Number,
// // // //     comment: String,
// // // //     createdAt: { type: Date, default: Date.now }
// // // //   }]
// // // // });

// // // // const adminSchema = new mongoose.Schema({
// // // //   username: String,
// // // //   password: String,
// // // //   slots: [slotSchema]
// // // // });

// // // // module.exports = mongoose.model('Admin', adminSchema);

// // // // models/admin.js
// // // const mongoose = require('mongoose');

// // // const slotSchema = new mongoose.Schema({
// // //   location: String,
// // //   price: Number,
// // //   availableSlot: Number,
// // //   totalSlot: Number,
// // //   description: String,
// // //   imageUrl: String,
// // //   bookedUsers: [{
// // //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// // //     username: String,
// // //     bookingTime: Date,
// // //     duration: Number
// // //   }],
// // //   reviews:[{
// // //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// // //     username: String,
// // //     rating: Number,
// // //     comment: String,
// // //     createdAt: { type: Date, default: Date.now }
// // //   }]
// // // });

// // // const adminSchema = new mongoose.Schema({
// // //   username: { type: String, required: true, unique: true },
// // //   email:    { type: String, required: true, unique: true },
// // //   password: { type: String, required: true },
// // //   role: {
// // //     type: String,
// // //     enum: ['superadmin', 'admin'],
// // //     default: 'admin'
// // //   },
// // //   verified: { type: Boolean, default: false },          // whether admin was manually verified
// // //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // who created this admin
// // //   createdAt: { type: Date, default: Date.now },
// // //   slots: [slotSchema]
// // // });

// // // module.exports = mongoose.model('Admin', adminSchema);
// // const mongoose = require('mongoose');

// // const slotSchema = new mongoose.Schema({
// //   location: String,
// //   price: Number,
// //   availableSlot: Number,
// //   totalSlot: Number,
// //   description: String,
// //   imageUrl: String,
// //   bookedUsers: [{
// //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //     username: String,
// //     bookingTime: Date,
// //     duration: Number
// //   }],
// //   reviews:[{
// //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //     username: String,
// //     rating: Number,
// //     comment: String,
// //     createdAt: { type: Date, default: Date.now }
// //   }]
// // });

// // const adminSchema = new mongoose.Schema({
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   gmail: { type: String, required: true, unique: true },  // Gmail added
// //   phone: { type: String, required: true, unique: true },  // Phone number added
// //   role: { 
// //     type: String, 
// //     enum: ["superadmin", "admin"], 
// //     default: "admin" 
// //   },
// //   slots: [slotSchema]
// // });

// // module.exports = mongoose.model('Admin', adminSchema);
// const mongoose = require('mongoose');

// const slotSchema = new mongoose.Schema({
//   location: String,
//   price: Number,
//   availableSlot: Number,
//   totalSlot: Number,
//   description: String,
//   imageUrl: String,
//   bookedUsers: [{
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     username: String,
//     bookingTime: Date,
//     duration: Number
//   }],
//   reviews:[{
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     username: String,
//     rating: Number,
//     comment: String,
//     createdAt: { type: Date, default: Date.now }
//   }]
// });

// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   gmail: { type: String, required: true, unique: true },
//   phone: { type: String, required: true, unique: true },
//   role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
//   loginCode: { type: String },   // stores special login code
//   slots: [slotSchema]
// });

// module.exports = mongoose.model('Admin', adminSchema);

// const mongoose = require('mongoose');
// const slotSchema = require('./slot');

// const slotSchema = new mongoose.Schema({
//   location: String,
//   price: Number,
//   availableSlot: Number,
//   totalSlot: Number,
//   description: String,
//   imageUrl: String,
//   bookedUsers: [{
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     username: String,
//     bookingTime: Date,
//     duration: Number
//   }],
//   reviews:[{
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     username: String,
//     rating: Number,
//     comment: String,
//     createdAt: { type: Date, default: Date.now }
//   }]
// });

// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   gmail: { type: String, required: true, unique: true },
//   phone: { type: String, required: true, unique: true },
//   role: { type: String, enum: ["superadmin", "admin"], default: "admin" },

//   // OTP fields
//   loginCode: { type: String },
//   loginCodeExpires: { type: Date },

//   slots: [slotSchema]
// });

// module.exports = mongoose.model('Admin', adminSchema);
const mongoose = require('mongoose');

// Slot Schema (embedded inside Admin)
const slotSchema = new mongoose.Schema({
  location: String,
  price: Number,
  availableSlot: Number,
  totalSlot: Number,
  description: String,
  imageUrl: String,
  bookedUsers: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    bookingTime: Date,
    duration: Number
  }],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

// Admin Schema
// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   gmail: { type: String, required: true, unique: true },
//   phone: { type: String, required: true, unique: true },
//   role: { type: String, enum: ["superadmin", "admin"], default: "admin" },

//   // OTP fields for login
//   loginCode: { type: String },
//   loginCodeExpires: { type: Date },

//   slots: [slotSchema]
// });
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    otp: { type: String, required: true } // <--- Fixed OTP for each admin
});

module.exports = mongoose.model('Admin', adminSchema);
