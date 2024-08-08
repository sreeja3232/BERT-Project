const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true
    }
})

module.exports = mongoose.model('Locations', categorySchema);
