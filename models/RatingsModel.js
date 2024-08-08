const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restName: {
        type: String,
        required: [true, 'restaurant name is required'],
    },
    slug: {
        type: String,
        required: [true, 'slug is required'],
    },
    description: {
        type: String,
        required: [true, 'decription is required'],
    },
    location: {
        type: mongoose.ObjectId,
        ref: 'Locations',
        required: [true, 'category is required'],
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    positiveReviews: {
        type: Number,
        default: 0,
    },
    negativeReviews: {
        type: Number,
        default: 0,
    },
    overallRating: {
        type: Number,
        default: 0,
    },
}, { timeStamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
