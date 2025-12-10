const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contact', contactSchema);
