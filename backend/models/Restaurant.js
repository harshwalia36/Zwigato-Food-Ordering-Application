const mongoose = require('mongoose');
const addressSchema = require('./CommonSchema');

const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String
    },
    dish_img: {
        type: String
    }
});

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required']
    },
    overview: {
        restaruant_type: {
            type: String
        },
        book_table: {
            type: Boolean
        },
        online_order: {
            type: Boolean
        },
        dish_liked: {
            type: [String]
        },
        approx_cost_2_person: {
            type: Number
        },
        restaruant_delivery_time: {
            open: {
                type: String
            },
            close: {
                type: String
            }
        },
    },
    restaruant_profile_img: {
        type: String
    },
    gallery: {
        photos: {
            type: [String]    // Array of photo URLs
        }
    },
    restaruant_menu: {
        type: [dishSchema],     // Array of dish objects
        required: [true, 'Menu is required']
    }
}, { timestamps: true });