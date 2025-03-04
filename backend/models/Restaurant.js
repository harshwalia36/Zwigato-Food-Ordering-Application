import mongoose from 'mongoose';
import addressSchema from './CommonSchema.js';

const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: String,
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
        restaurant_type: {
            type: [String],
            required: [true, 'Restaurant type is required']
        },
        online_order: {
            type: Boolean,
            default: true
        },
        dish_liked: {
            type: [String]
        },
        approx_cost_2_person: {
            type: Number,
            required: [true, 'Approx cost for 2 person is required']
        }
    },
    /*
     * Store opening and closing time in 24-hour format.
    */
    restaurant_delivery_time: {
        open: {
            type: Date,
            required: [true, 'Opening time is required']
        },
        close: {
            type: Date,
            required: [true, 'Closing time is required']
        },
        open_days: {
            type: [Boolean], // Array of 7 booleans (Monday to Sunday)
            required: [true, 'Open days are required']
        }
    },
    restaurant_profile_img: {
        type: String
    },
    gallery: {
        photos: {
            type: [String]    // Array of photo URLs
        }
    },
    restaurant_menu: {
        type: [{
            category: {
                type: String,
                required: [true, 'Category is required']
            },
            dishes: {
                type: [dishSchema],
                required: [true, 'Dishes are required']
            }
        }],
        required: [true, 'Menu is required']
    }
}, { timestamps: true });


export default mongoose.model('Restaurant', restaurantSchema);