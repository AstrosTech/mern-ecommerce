const stripe = require('stripe')(process.env.STRIPE_SECRET)
const { Account, Purchase } = require('../models')

module.exports = (app) => {
    app.post('/webhook', async (req, res) => {
        const sig = req.headers['stripe-signature']
        let event = null;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.endpointSecret);
        } catch (err) {
            // invalid signature
            res.status(400).end();
            return;
        }

        res.sendStatus(200);
        if(event['type'] != "checkout.session.completed") return

        let intent = event.data.object

        try {
            let account = await Account.findById(intent.metadata.accountId)
            
            account.cart = []
            account.save()

            
            for(cartItem of JSON.parse(intent.metadata.cart)) {
                Purchase.create({ purchasedBy: intent.metadata.accountId, purchasedProduct: cartItem, shipping: { ...intent.shipping.address } })    
            }

        } catch(err) {
            console.log(err)
        }
    })
}