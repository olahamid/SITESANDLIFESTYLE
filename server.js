const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// connect to the database
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// Database connection 
// const connectDB = require('./config/database');
// connectDB();

// Routes
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');
// const authRoutes = require('./routes/auth');
const becomeAnAffiliateRoutes = require('./routes/becomeAnAffiliate');
const bookATourRoutes = require('./routes/bookATour');
// const youTubeRoutes = require('./routes/youTube');

// Use routes
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/affiliate', becomeAnAffiliateRoutes);
app.use('/api/book-a-tour', bookATourRoutes);
// app.use('/api/youtube', youTubeRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Sites and Lifestyle Backend API',
        version: '1.0.0',
        endpoint: {
            contact: '/api/contact',
            newsletter: '/api/newsletter',
            affiliate: '/api/affiliate',
            bookATour: '/api/book-a-tour'
            // auth: '/api/auth',
            // youtube: '/api/youtube'
        }
    });
});

// error handling cathes all
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});