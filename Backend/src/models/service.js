const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default:null,
        required: true,
        min: 0
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        default: ''
    },
    imagePublicId: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);