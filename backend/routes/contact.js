const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm');
const sendNotifications = require('../utils/sendNotifications');

// Submit contact form
router.post('/', async (req, res) => {
  const { name, location, phone, email, services, message } = req.body;

  if (!name || !location || !phone || !services || services.length === 0) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  try {
    const form = new ContactForm({ name, location, phone, email, services, message });
    await form.save();

    // Send email and WhatsApp notifications
    await sendNotifications({ name, location, phone, email, services, message });

    res.status(201).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error in /contact:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
