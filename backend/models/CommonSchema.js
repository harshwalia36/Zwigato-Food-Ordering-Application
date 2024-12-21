const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    zip: {
        type: String
    },
    location: {
        type: pointSchema
    }
});

module.exports.pointSchema = pointSchema;
module.exports.addressSchema = addressSchema;