// backend/utils/sendNotifications.js
const nodemailer = require("nodemailer");

const sendNotifications = async ({ name, location, phone, email, services, message }) => {
  try {
    // --- Log environment variables ---
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");
    console.log("BUSINESS_EMAIL:", process.env.BUSINESS_EMAIL);

    // --- Create transporter with debug and logger ---
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
      logger: true,
      debug: true,
    });

    // --- Verify connection ---
    try {
      await transporter.verify();
      console.log("✅ Gmail SMTP connection verified");
    } catch (err) {
      console.error("❌ Gmail verification failed:", err.message || err);
      return; // Stop if connection fails
    }

    // --- Compose email ---
    const emailText = `
New Contact Form Submission:

Name: ${name}
Location: ${location || "N/A"}
Phone: ${phone}
Email: ${email || "N/A"}
Services: ${services?.length ? services.join(", ") : "N/A"}
Message: ${message || "N/A"}
    `.trim();

    // --- Send email with timeout protection ---
    try {
      const info = await Promise.race([
        transporter.sendMail({
          from: `"Aptha Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.BUSINESS_EMAIL,
          subject: "📩 New Contact Form Submission",
          text: emailText,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("SMTP timeout after 10s")), 10000)
        ),
      ]);

      console.log("✅ Email sent successfully:", info.response);
    } catch (err) {
      console.error("❌ Error sending email:", err.message || err);
    }

  } catch (err) {
    console.error("❌ Unexpected error in sendNotifications:", err.message || err);
  }
};

module.exports = sendNotifications;
