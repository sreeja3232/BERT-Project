const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
    phone: {
        type: String,
        required: [true, 'phone nummber is required'],
    },
    role:{
        type:Number,
        default:0,
    }
}, { timestamps: true });


module.exports = mongoose.model('users', userSchema);

// from this users model(users table) will be created, by taking userSchema as reference
