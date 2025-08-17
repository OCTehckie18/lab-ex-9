const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendRegistrationEmail = async (userEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Registration Successful!',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Welcome to Our Platform!</h2>
        <p>Dear ${userName},</p>
        <p>Thank you for registering with us. Your account has been successfully created.</p>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Account Details:</h3>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
        </div>
        <p>You can now start using our platform and explore all the features.</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Registration email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendRegistrationEmail };
