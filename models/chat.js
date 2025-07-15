const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: String, 
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: [messageSchema]
});

module.exports = mongoose.model('Chat', chatSchema);
