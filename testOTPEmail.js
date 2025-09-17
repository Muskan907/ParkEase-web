require('dotenv').config();
const nodemailer = require('nodemailer');

const otpTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS
  }
});

// Verify connection
otpTransporter.verify((err, success) => {
  if (err) console.log('OTP transporter error:', err);
  else console.log('OTP transporter ready to send emails!');
});

// Optional: send a test OTP email
otpTransporter.sendMail({
  from: `"ParkEase OTP" <${process.env.OTP_EMAIL_USER}>`,
  to: 'your-personal-email@gmail.com', // replace with your email
  subject: 'Test OTP',
  html: `<p>Your test OTP is <strong>123456</strong></p>`
}, (err, info) => {
  if (err) console.log('Error sending test OTP:', err);
  else console.log('Test OTP email sent:', info.response);
});
