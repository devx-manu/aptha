const nodemailer = require("nodemailer");

const sendNotifications = async ({ name, location, phone, email, services, message }) => {
  try {
    // Log environment variables for debugging
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");
    console.log("BUSINESS_EMAIL:", process.env.BUSINESS_EMAIL);

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Must be Gmail App Password
      },
    });

    // Verify connection
    await transporter.verify();
    console.log("✅ Gmail SMTP connection verified");

    // Compose email text
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
    console.error("❌ Error sending notifications:", err.message || err);
  }
};

module.exports = sendNotifications;
