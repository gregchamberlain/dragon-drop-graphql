import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

export default Root;