const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        },
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    }
});

const Product = mongoose.model('Product', schema);

module.exports = Product;