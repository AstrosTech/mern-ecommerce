const { AuthenticationError } = require('apollo-server-express');
const { Purchase, Product, Account } = require('../models');
const { signToken } = require('../util/auth');
const { toCent, formatCart } = require('../util/resolverUtility')

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const resolvers = {
    Query: {
        /* Accounts */
        getAccount: async (parent, { accountId }) => {
            return await Account.findById(accountId)
        },

        getAllAccounts: async () => {
          return await Account.find({})
        },
        
        /* Products */
        getProduct: async (parent, { productId }) => { // Product ID is referring to the stripe product id
          return await Product.findOne({ productId })
        },

        getAllProducts: async () => {
          return await Product.find({})
        },

        /* Purchases */
        getPurchase: async (parent, { purchaseId }) => {
          return await Purchase.findById(purchaseId)
        },

        getAllPurchases: async () => {
          return await Purchase.find({})
        },

        /* Stripe */
        createCheckout: async (parent, { accountId }) => {
            let account = await Account.findById(accountId).populate('cart')
            let cart = await formatCart(account.cart)

            let stringedCart = JSON.stringify(account.cart.map((item) => { return item._id }))

            console.log(stringedCart)
            const session = await stripe.checkout.sessions.create({
              mode: "payment",
              success_url: `${process.env.BASE_URL}success`,
              cancel_url: `${process.env.BASE_URL}cancel`,
              line_items: cart,
              shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
              },
              metadata: {
                accountId,
                cart: stringedCart
              }
            })

            return session.url
        }
    },

    Mutation: {
        addAccount: async (parent, { email, password }) => {
            const user = await Account.create({ email, password });
            const token = signToken(user);
            
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await Account.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },

        /* Stripe */
        createProduct: async (parent, { name, description, price }) => {
          const stripeProduct = await stripe.products.create({
            name: name,
            description: description,
            shippable: true
          },
          {
            apiKey: process.env.STRIPE_SECRET
          }
          );

          const stripePrice = await stripe.prices.create({
            unit_amount: toCent(price),
            currency: 'usd',
            product: stripeProduct.id
          }, {
            apiKey: process.env.STRIPE_SECRET
          })

          let savedProduct = await Product.create({
            name,
            description,
            price,
            productId: stripeProduct.id,
            priceId: stripePrice.id
          })

          return savedProduct
        },

        archiveProduct: async (parent, { productId }) => {
          let product = await Product.findOneAndDelete({ productId })

          stripe.products.update(productId, { active: false } );

          return product
        },

        addToCart: async (parent, { accountId, productId }) => {
          return await Account.findOneAndUpdate({ _id: accountId }, { $push: { cart: productId }})
        },

        removeFromCart: async (parent, { accountId, productId }) => {
          let account = await Account.findById(accountId)
          account.cart = account.cart.filter((i => v => v !== 2 || --i)(1));

          return await account.save()
        }
    }
}

module.exports = resolvers