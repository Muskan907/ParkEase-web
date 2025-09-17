// testEmail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Use the email credentials from your .env
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS  // App password
  }
});

// Verify connection configuration
transporter.verify((err, success) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Ready to send emails!');
  }
});
