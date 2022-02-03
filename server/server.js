
require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.start().then(() => { server.applyMiddleware({ app }); })

app.use('/webhook', express.raw({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
    require('./util/stripeEvents')(app)
});

