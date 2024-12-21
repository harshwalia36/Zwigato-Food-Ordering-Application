const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    payment_status: {
        type: String,
        enum: ['Pending', 'Paid']
    },
    payment_method: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking']
    },
    payment_amount: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);