// // const nodemailer = require('nodemailer');

// // const transporter = nodemailer.createTransport({
// //   service: 'Gmail',
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // async function sendConfirmationEmail(toEmail, userName, bookingDetails) {
// //   const mailOptions = {
// //     from: '"ParkEase" <' + process.env.EMAIL_USER + '>',
// //     to: toEmail,
// //     subject: 'Booking Confirmation - ParkEase',
// //     html: `
// //       <h2>Hello ${userName},</h2>
// //       <p>Your booking is confirmed. Here are your booking details:</p>
// //       <ul>
// //         <li><strong>Date:</strong> ${bookingDetails.date}</li>
// //         <li><strong>Time:</strong> ${bookingDetails.time}</li>
// //         <li><strong>Slot:</strong> ${bookingDetails.slotName}</li>
// //         </ul>
// //         <p> Please complete the payment within 24 hours, otherwise it will automatically gets cancelled</p>
// //       <p>Thank you for booking with ParkEase!</p>
// //     `,
// //   };

// //   try {
// //     await transporter.sendMail(mailOptions);
// //     console.log('Confirmation email sent to', toEmail);
// //   } catch (error) {
// //     console.error('Error sending confirmation email:', error);
// //   }
// // }

// // module.exports = { sendConfirmationEmail };
// const nodemailer = require('nodemailer');

// // Transporter for booking confirmation emails
// const confirmationTransporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // App Password if needed
//   },
// });

// // Transporter for OTP emails
// const otpTransporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.OTP_EMAIL_USER,
//     pass: process.env.OTP_EMAIL_PASS, // App Password
//   },
// });

// // Send booking confirmation email
// async function sendConfirmationEmail(toEmail, userName, bookingDetails) {
//   const mailOptions = {
//     from: `"ParkEase" <${process.env.EMAIL_USER}>`,
//     to: toEmail,
//     subject: 'Booking Confirmation - ParkEase',
//     html: `
//       <h2>Hello ${userName},</h2>
//       <p>Your booking is confirmed. Here are your booking details:</p>
//       <ul>
//         <li><strong>Date:</strong> ${bookingDetails.date}</li>
//         <li><strong>Time:</strong> ${bookingDetails.time}</li>
//         <li><strong>Slot:</strong> ${bookingDetails.slotName}</li>
//       </ul>
//       <p>Please complete the payment within 24 hours, otherwise it will automatically get cancelled.</p>
//       <p>Thank you for booking with ParkEase!</p>
//     `,
//   };

//   try {
//     await confirmationTransporter.sendMail(mailOptions);
//     console.log('Confirmation email sent to', toEmail);
//   } catch (error) {
//     console.error('Error sending confirmation email:', error);
//   }
// }

// // Send OTP email
// async function sendOTPEmail(toEmail, otp) {
//   const mailOptions = {
//     from: `"ParkEase OTP" <${process.env.OTP_EMAIL_USER}>`,
//     to: toEmail,
//     subject: 'Your ParkEase OTP',
//     html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
//   };

//   try {
//     await otpTransporter.sendMail(mailOptions);
//     console.log('OTP email sent to', toEmail);
//   } catch (error) {
//     console.error('Error sending OTP email:', error);
//   }
// }

// module.exports = { sendConfirmationEmail, sendOTPEmail };

// require('dotenv').config();














// const nodemailer = require('nodemailer');

// // Normal emails (optional)
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// console.log("OTP USER:", process.env.OTP_EMAIL_USER);
// console.log("OTP PASS:", process.env.OTP_EMAIL_PASS ? "✅ Loaded" : "❌ Missing");

// // OTP emails
// // const otpTransporter = nodemailer.createTransport({
// //   service: 'Gmail',
// //   auth: {
// //     user: process.env.OTP_EMAIL_USER,
// //     pass: process.env.OTP_EMAIL_PASS
// //   }
// // });
// const otpTransporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // true for 465, false for 587
//   auth: {
//     user: process.env.OTP_EMAIL_USER,
//     pass: process.env.OTP_EMAIL_PASS
//   }
// });

// // For testing on server start
// otpTransporter.verify((err, success) => {
//   if (err) console.error("❌ OTP transporter error:", err);
//   else console.log("✅ OTP transporter ready");
// });

// const sendOTPEmail = async (to, otp) => {
//   try {
//     const info = await otpTransporter.sendMail({
//       from: `"ParkEase OTP" <${process.env.OTP_EMAIL_USER}>`,
//       to,
//       subject: "Your ParkEase OTP Code",
//       text: `Your OTP is: ${otp}`,
//       html: `<p>Your OTP is: <b>${otp}</b></p>`
//     });
//     console.log("✅ OTP Email sent:", info.response);
//   } catch (err) {
//     console.error("❌ Email sending error:", err);
//     throw err;
//   }
// };

// module.exports = { sendOTPEmail };



// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // OTP emails transporter (Gmail)
// const otpTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.OTP_EMAIL_USER,
//         pass: process.env.OTP_EMAIL_PASS
//     }
// });

// // Verify transporter
// otpTransporter.verify((err, success) => {
//     if (err) console.error("❌ OTP transporter error:", err);
//     else console.log("✅ OTP transporter ready");
// });

// const sendOTPEmail = async (to, otp) => {
//     try {
//         const info = await otpTransporter.sendMail({
//             from: `"ParkEase OTP" <${process.env.OTP_EMAIL_USER}>`,
//             to,
//             subject: 'Your ParkEase OTP',
//             text: `Your OTP is: ${otp}`,
//             html: `<p>Your OTP is: <b>${otp}</b></p>`
//         });
//         console.log("✅ OTP Email sent:", info.response);
//     } catch (err) {
//         console.error("❌ Email sending error:", err);
//         throw err;
//     }
// };

// module.exports = { sendOTPEmail };


// // utils/mailer.js
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Create transporter for OTP emails
// const otpTransporter = nodemailer.createTransport({
//   service: 'gmail',           // Use Gmail service
//   auth: {
//     user: process.env.OTP_EMAIL_USER,
//     pass: process.env.OTP_EMAIL_PASS
//   }
// });

// // Verify transporter on server start
// otpTransporter.verify((err, success) => {
//   if (err) console.error("❌ OTP transporter error:", err);
//   else console.log("✅ OTP transporter ready");
// });

// // Function to send OTP
// const sendOTPEmail = async (to, otp) => {
//   try {
//     const info = await otpTransporter.sendMail({
//       from: `"ParkEase OTP" <${process.env.OTP_EMAIL_USER}>`,
//       to,
//       subject: 'Your ParkEase OTP Code',
//       text: `Your OTP is: ${otp}`,
//       html: `<p>Your OTP is: <b>${otp}</b></p>`
//     });
//     console.log("✅ OTP Email sent:", info.response);
//   } catch (err) {
//     console.error("❌ Email sending error:", err);
//     throw err;
//   }
// };

// module.exports = { sendOTPEmail };


const nodemailer = require('nodemailer');

// OTP Transporter
const otpTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS
  }
});

// Verify transporter
otpTransporter.verify((err, success) => {
  if (err) console.error("❌ OTP transporter error:", err);
  else console.log("✅ OTP transporter ready");
});

// Send OTP email
const sendOTPEmail = async (to, otp) => {
  try {
    const info = await otpTransporter.sendMail({
      from: `"ParkEase OTP" <${process.env.OTP_EMAIL_USER}>`,
      to,
      subject: "Your ParkEase OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <b>${otp}</b></p>`
    });
    console.log("✅ OTP Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email sending error:", err);
    throw err;
  }
};

module.exports = { sendOTPEmail };
