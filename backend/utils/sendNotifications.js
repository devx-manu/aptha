console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");
console.log("BUSINESS_EMAIL:", process.env.BUSINESS_EMAIL);

// backend/utils/sendNotifications.js
const nodemailer = require("nodemailer");
const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const sendNotifications = async ({ name, location, phone, email, services, message }) => {
  try {
    // Log to verify env variables
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");
    console.log("BUSINESS_EMAIL:", process.env.BUSINESS_EMAIL);

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // must be App Password
      },
    });

    // Verify connection
    await transporter.verify();
    console.log("✅ Gmail SMTP connection verified");

    // Compose email
    const emailText = `
New Contact Form Submission:

Name: ${name}
Location: ${location || "N/A"}
Phone: ${phone}
Email: ${email || "N/A"}
Services: ${services?.length ? services.join(", ") : "N/A"}
Message: ${message || "N/A"}
    `.trim();

    // Send email to business email (can be same as sender)
    const info = await transporter.sendMail({
      from: `"Aptha Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: "📩 New Contact Form Submission",
      text: emailText,
    });

    console.log("✅ Email sent successfully:", info.response);

  


  } catch (err) {
    // Detailed error logging
    console.error("❌ Error sending notifications:", err.response?.data || err.message || err);
  }
};

module.exports = sendNotifications;
