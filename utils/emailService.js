const nodemailer = require('nodemailer');

// Create a transporter (reusable) 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendContactNotification = async (contactData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: '🔔 New Contact Form Submission',
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone}</p>
            <p><strong>Message:</strong> ${contactData.message}</p>
            <hr>
            <p>This email was sent automatically from sitesandlifestyle website.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

const sendNewsLetterConfirmation = async (email) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: '📧 Newsletter Subscription Confirmation',
        html: `
            <h2>Thank You for Subscribing to Our Newsletter!</h2>
            <p>We're excited to have you on board. Stay tuned for the latest updates, offers, and news from Sites and Lifestyle.</p>
            <hr>
            <p>This email was sent automatically from sitesandlifestyle website.</p>
        `
    };
    
    await transporter.sendMail(mailOptions); // ← Move inside function
}; // ← Add closing brace

const sendTourBookingConfirmation = async (bookingData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: bookingData.email,
        subject: '📅 Tour Booking Confirmation',
        html: `
            <h2>Your Tour Booking is Confirmed!</h2>
            <p>Dear ${bookingData.firstName},</p>
            <p>Thank you for booking a tour with us. Here are your booking details:</p>
            <ul>
                <li><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${bookingData.time}</li>
            </ul>
            <p>We look forward to seeing you!</p>
            <hr>
            <p>This email was sent automatically from sitesandlifestyle website.</p>
        `
    };
    
    await transporter.sendMail(mailOptions); // ← Already inside, good
};

const sendTourBookingNotification = async (bookingData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL, // ← Send to admin
        subject: '🔔 New Tour Booking',
        html: `
            <h2>New Tour Booking Received</h2>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone || 'Not provided'}</p>
            <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <hr>
            <p>This email was sent automatically from sitesandlifestyle website.</p>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

const sendAffiliateConfirmation = async (applicationData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: applicationData.email, // ← Send to applicant
        subject: '✅ Affiliate Application Received',
        html: `
            <h2>Thank You for Your Application!</h2>
            <p>Dear ${applicationData.fullName},</p>
            <p>We've received your affiliate application. Our team will review it and get back to you within 2-3 business days.</p>
            <hr>
            <p>This email was sent automatically from sitesandlifestyle website.</p>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

const sendAffiliateNotification = async (applicationData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL, // ← Send to admin
        subject: '🤝 New Affiliate Application Received',
        html: `
            <h2>New Affiliate Application</h2>
            <p><strong>Name:</strong> ${applicationData.fullName}</p>
            <p><strong>Email:</strong> ${applicationData.email}</p>
            <p><strong>Phone:</strong> ${applicationData.phoneNumber}</p>
            <p><strong>Residential Address:</strong> ${applicationData.residentialAddress}</p>
            <hr>
            <p>This email was sent automatically from sitesandlifestyle website.</p>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendContactNotification,
    sendNewsLetterConfirmation,
    sendTourBookingConfirmation,
    sendTourBookingNotification,
    sendAffiliateConfirmation,
    sendAffiliateNotification
};