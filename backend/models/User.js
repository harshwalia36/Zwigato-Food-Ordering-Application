const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    age: {
        type: Number
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);