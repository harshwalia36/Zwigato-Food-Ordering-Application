const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);