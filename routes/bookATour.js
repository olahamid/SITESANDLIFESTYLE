const express = require('express');
const router = express.Router();
const TourBooking = require('../models/TourBooking');
const { sendTourBookingConfirmation, sendTourBookingNotification } = require('../utils/emailService');

router.post('/', async(req, res) => {
    try {
        const { name, email, phone, date, hours, minutes } = req.body;

        if (!name || !email || !phone || !date || !hours) {
            return res.status(400).json({
                error: 'All required fields must be filled'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format'
            });
        }
        
        const bookATour = new TourBooking({ 
            name,
            email,
            phone,
            date,
            time: `${hours}:${minutes || '00'}`
        });

        await bookATour.save();
        
        // Send confirmation to user - use "firstName: name" to match template
        await sendTourBookingConfirmation({ 
            firstName: name,  // ← Map "name" to "firstName"
            email, 
            phoneNumber: phone,  // ← Map "phone" to "phoneNumber"
            date, 
            time: `${hours}:${minutes || '00'}` 
        });
        
        // Send notification to admin
        await sendTourBookingNotification({ 
            firstName: name,  // ← Map "name" to "firstName"
            email, 
            phoneNumber: phone,  // ← Map "phone" to "phoneNumber"
            date, 
            time: `${hours}:${minutes || '00'}` 
        });

        res.status(200).json({
            success: true,
            message: 'Tour booked successfully',
            data: { 
                name,
                email,
                phone,
                date,
                time: `${hours}:${minutes || '00'}`
            }
        });
        
    } catch (error) {
        console.error('❌ Error handling tour booking:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;