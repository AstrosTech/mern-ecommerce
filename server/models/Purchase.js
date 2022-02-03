const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
    purchasedBy: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },

    purchasedProduct: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },

    shipping: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
        },
        postal_code: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },

    purchasedAt: {
        type: Date,
        default: Date.now
    }
});

const Purchase = model('Purchases', purchaseSchema);

module.exports = Purchase;
