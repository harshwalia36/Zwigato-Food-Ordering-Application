import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        // required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const addressSchema = new Schema({
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
        type: Number,
        required: [true, 'Zip is required']
    },
    location: {
        type: pointSchema,
        required: [true, 'Location is required']
    }
});

export default addressSchema;
