const mongoose = require('mongoose');
const {Schema}=mongoose;

const parkingSchema = new Schema({
    price:String,
    availableSlot:String,
    totalSlot:String,
    location:String
})

module.exports = mongoose.model('Parking',parkingSchema);