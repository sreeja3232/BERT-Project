const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    restid: String,
    text: String,
    sentiment: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reviews', reviewSchema);

