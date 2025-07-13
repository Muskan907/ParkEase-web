const mongoose = require('mongoose');
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
        bookingTime: String,
        duration: String
    }],
    reviews:[{
        userId:mongoose.Schema.Types.ObjectId,
        username:String,
        rating:Number,
        comment:String,
        createAt:{type:Date,default:Date.now}

    }]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    slots: [slotSchema]
});

const adminController = require('../controllers/adminController');
module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
