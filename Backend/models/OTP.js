const mongoose = require('mongoose');
const sendVerificationEmail = require('../utils/MailSender');
const sendVerificationMessage = require('../utils/SmsSender'); // <-- SMS function

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String, // String to preserve leading 0s
        required: true,
    },
    eotp: {
        type: String,
        required: true,
    },
    motp: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
        expires: 5 * 60, // TTL index - expires in 5 minutes
    },
});

// Middleware to send email and SMS after OTP is created
otpSchema.pre('save', async function (next) {
    try {
        // Send email
        await sendVerificationEmail(this.email, `Your email OTP is: ${this.eotp}`);

        // Send SMS
        // await sendVerificationMessage(this.mobileNo, `Your mobile OTP is: ${this.motp}`);

        console.log('OTP email and SMS sent successfully.');
        next();
    } catch (err) {
        console.error('Error sending OTP via email or SMS:', err);
        next(err); // propagate error
    }
});

module.exports = mongoose.model('OTP', otpSchema);
