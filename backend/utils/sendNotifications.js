const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const sendNotifications = async ({ name, location, phone, email, services, message }) => {
  try {
    // Send email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const emailText = `
New Contact Form Submission

Name: ${name}
Location: ${location || "N/A"}
Phone: ${phone}
Email: ${email || "N/A"}
Services: ${services.length ? services.join(', ') : "N/A"}
Message: ${message || "N/A"}
    `.trim();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      subject: 'New Contact Form Submission',
      text: emailText
    });
    console.log("✅ Email sent");

    

  } catch (err) {
    console.error("❌ Error sending notifications:", err.response?.data || err.message);
  }
};

module.exports = sendNotifications;
