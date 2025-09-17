require('dotenv').config();
const { sendOTPEmail } = require('./utils/mailer');

sendOTPEmail('muskanpatni67@gmail.com', 123456);
