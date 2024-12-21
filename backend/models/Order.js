const mongoose = require('mongoose');
const addressSchema = require('./CommonSchema');

const Schema = mongoose.Schema;

const itemSchema = mongoose.Schema({
    item: {
        name: {
            type: String
        },
        qty: {
            type: Number
        },
    },
});

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    ordered_items: [itemSchema],
    order_total: {
        type: Number
    },
    _status: {
        type: String,
        enum: ['Order Confirmed', 'Order Delivered']
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);