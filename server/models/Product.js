const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: "No Product Name Provided",
        unique: true,
    },

    description: {
        type: String,
        required: "No Product Description Provided"
    },

    imageURL: {
        type: String,
        required: "No Product Image Provided"
    },

    price: {
        type: Number,
        required: "No Product Price Provided"
    },

    productId: { // Provided by stripe ( Need to make invoice )
        type: String,
        required: true
    },

    priceId: { // Provided by stripe
        type: String,
        required: true
    },

    purchases: {
        type: Schema.Types.ObjectId,
        ref: "Purchases"
    }
});

const Product = model('Product', productSchema);

module.exports = Product;
