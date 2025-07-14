const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail(toEmail, userName, bookingDetails) {
  const mailOptions = {
    from: '"ParkEase" <' + process.env.EMAIL_USER + '>',
    to: toEmail,
    subject: 'Booking Confirmation - ParkEase',
    html: `
      <h2>Hello ${userName},</h2>
      <p>Your booking is confirmed. Here are your booking details:</p>
      <ul>
        <li><strong>Date:</strong> ${bookingDetails.date}</li>
        <li><strong>Time:</strong> ${bookingDetails.time}</li>
        <li><strong>Slot:</strong> ${bookingDetails.slotName}</li>
        </ul>
        <p> Please complete the payment within 24 hours, otherwise it will automatically gets cancelled</p>
      <p>Thank you for booking with ParkEase!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to', toEmail);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

module.exports = { sendConfirmationEmail };