import mongoose from 'mongoose';

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
    order_status: {
        type: String,
        enum: ['Order Confirmed', 'Order Delivered', 'Order Cancelled'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
