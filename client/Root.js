import React from 'react';
import ApolloClient, { toIdValue } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';

const dataIdFromObject = o => {
  if (o.id && o.__typename) {
    return o.__typename + o.id;
  }
  return null;
};

const client = new ApolloClient({
  dataIdFromObject,
  customResolvers: {
    Query: {
      page: (_, args) => toIdValue(dataIdFromObject({ __typename: 'Page', id: args['id'] })),
    },
  },
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

export default Root;