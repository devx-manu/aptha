// backend/utils/sendNotifications.js
const nodemailer = require("nodemailer");

// Main function to send email notifications
const sendNotifications = async ({ name, location, phone, email, services, message }) => {
  try {
    // Log environment variables
    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");
    console.log("🏢 BUSINESS_EMAIL:", process.env.BUSINESS_EMAIL);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.BUSINESS_EMAIL) {
      console.error("❌ Missing email environment variables! Check Render env settings.");
      return;
    }

    // Create Gmail transporter with debug
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // MUST be Gmail App Password
      },
      logger: true,   // Logs SMTP activity to console
      debug: true,    // Debug mode prints details of connection & sending
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ Gmail SMTP connection verified");

    // Compose email content
    const emailText = `
New Contact Form Submission:

Name: ${name}
Location: ${location || "N/A"}
Phone: ${phone}
Email: ${email || "N/A"}
Services: ${services?.length ? services.join(", ") : "N/A"}
Message: ${message || "N/A"}
    `.trim();

    // Send email
    const info = await transporter.sendMail({
      from: `"Aptha Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: "📩 New Contact Form Submission",
      text: emailText,
    });

    console.log("✅ Email sent successfully:", info.response);
  } catch (err) {
    console.error("❌ Error sending notifications:", err);
  }
};

module.exports = sendNotifications;
