const express = require('express');
const router = express.Router();
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { sendNewsLetterConfirmation } = require('../utils/emailService');

router.post('/subscribe', async(req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: 'Email is required'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format'
            });
        }

        // Check if email already exists
        const existingSubscriber = await NewsletterSubscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({
                error: 'This email is already subscribed'
            });
        }

        const subscriber = new NewsletterSubscriber({ email });
        await subscriber.save();

        await sendNewsLetterConfirmation(email);

        res.status(200).json({
            success: true,
            message: 'Subscribed to newsletter successfully',
            data: { email }
        });
        
    } catch (error) {
        console.error('Error handling newsletter subscription:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;