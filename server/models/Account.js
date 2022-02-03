const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const accountSchema = new Schema({
    email: {
        type: String,
        required: 'No email provided.',
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },

    password: {
        type: String,
        required: true
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },

    stripeCustomerId: {
        type: String
    },

    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        }
    ],

    purchases: [
        {
            type: Schema.Types.ObjectId,
            ref: "Purchases"
        }
    ]
});

accountSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
    
accountSchema.methods.isCorrectPassword = async function(password)  {
    return await bcrypt.compare(password, this.password);
};

const Account = model('Account', accountSchema);

module.exports = Account;