const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm');
const sendNotifications = require('../utils/sendNotifications');

// Submit contact form
router.post('/', async (req, res) => {
  const { name, location, phone, email, services, message } = req.body;

  // Validate required fields
  if (!name || !location || !phone || !services || services.length === 0) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  try {
    // Save form to database
    const form = new ContactForm({ name, location, phone, email, services, message });
    await form.save();

    // Send notifications asynchronously (do not block response)
    sendNotifications({ name, location, phone, email, services, message })
      .catch(err => console.error("Notification error:", err));

    // Respond immediately to frontend
    res.status(201).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error in /contact:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
