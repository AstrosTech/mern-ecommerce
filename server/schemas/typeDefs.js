const { gql } = require('apollo-server-express');

const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
        return new Date(value);
    },

    serialize(value) {
        return value.toISOString();
    }
})

const typeDefs = gql`
    scalar Date

    type Account {
        _id: ID
        email: String
        password: String
        createdAt: Date
        isAdmin: Boolean
        cart: [Product]
        purchases: [Purchases]
    }

    type Product {
        _id: ID
        name: String
        description: String
        imageURL: String
        price: Float
        productId: String
        priceId: String
        purchases: [Purchases]
    }

    type Shipping { # Definition for purchase
        city: String
        country: String
        line1: String
        line2: String
        postal_code: String
        state: String
    }

    type Purchases {
        _id: ID
        purchasedBy: Account
        purchasedProduct: Product
        purchasedAt: Date
        shipping: Shipping
    }

    type Auth {
        token: ID!
        account: Account
    }

    type Query {
        getAccount(accountId: ID): Account
        getAllAccounts: [Account]
        getProduct(productId: ID): Product
        getAllProducts: [Product]
        getPurchase(purchaseId: ID): Purchases
        getAllPurchases: [Purchases]
        createCheckout(accountId: ID): String
    }

    type Mutation {
        addAccount(email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createProduct(name: String!, description: String!, price: Float!, imageURL: String): Product
        archiveProduct(productId: String): Product # Cannot delete products through api, only able to archive ( soft delete )
        addToCart(accountId: String, productId: String): Account 
        removeFromCart(accountId: String, productId: String): Account
        removeProductFromCart(accountId: String, productId: String): Account # Removes entire product ( if they had multiple and want the all of them gone )
        changeQuantity(accountId: String, productId: String, quantity: Int): Account
    }
`

module.exports = typeDefs