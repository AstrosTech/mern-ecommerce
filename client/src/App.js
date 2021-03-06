import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/homepage'
import Cart from './pages/cart'
import FillProduct from './pages/products';
import Header from './components/header';
import Footer from './components/footer'

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  function App() {
    return (
      <ApolloProvider client={client}>
        <Router>
              <Header/>
              <Route exact path="/">
                <Home/>
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/signup">
                <Signup />
              </Route>

              <Route exact path="/products">
                <FillProduct/>
              </Route>

              <Route exact path="/cart">
                <Cart/>
              </Route>
            <Footer />
        </Router>
      </ApolloProvider>
    );
  }
  
  export default App;
