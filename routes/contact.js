const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

router.post('/', async(req, res) => {
    try {
        const { name, email, phone, message } = req.body;  
        
        console.log('Received data:', { name, email, phone, message }); // ← Add this
        
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ 
                error: 'All fields are required'
            });   
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format' 
            });
        }
        
        console.log('Saving to database...'); // ← Add this
        const contact = new Contact({
            name,
            email,
            phone,
            message
        });
        await contact.save();
        console.log('Saved successfully!'); // ← Add this

        console.log('Sending email...'); // ← Add this
        await sendContactNotification({ name, email, phone, message });
        console.log('Email sent!'); // ← Add this

        res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: { name, email, phone }
        });
        
    } catch (error) {
        console.error('❌ Error details:', error); // ← Better logging
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

module.exports = router;