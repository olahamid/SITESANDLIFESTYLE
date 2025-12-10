const express = require('express');
const router = express.Router();
const AffiliateApplication = require('../models/AffiliateApplication');
const { sendAffiliateConfirmation, sendAffiliateNotification } = require('../utils/emailService');

router.post('/', async(req, res) => {
    try {
        const { fullName, email, phone, residentialAddress } = req.body;

        if (!fullName || !email || !phone || !residentialAddress) {
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

        const affiliateApplication = new AffiliateApplication({
            fullName,
            email,
            phone: phone,  // ← Map "phone" to "phoneNumber"
            residentialAddress
        });
        
        await affiliateApplication.save();
        
        // Send confirmation to applicant
        await sendAffiliateConfirmation({ 
            fullName, 
            email, 
            phoneNumber: phone,  // ← Map "phone" to "phoneNumber"
            residentialAddress 
        });
        
        // Send notification to admin
        await sendAffiliateNotification({ 
            fullName, 
            email, 
            phoneNumber: phone,  // ← Map "phone" to "phoneNumber"
            residentialAddress 
        });

        res.status(200).json({
            success: true,
            message: 'Affiliate application submitted successfully',
            data: {
                fullName,
                email,
                phone,
                residentialAddress
            }
        });
        
    } catch (error) {
        console.error('❌ Error handling affiliate application:', error);  // ← Add logging
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;