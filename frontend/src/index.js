import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { DataContextProvider } from './context/DataContext';

const client = new ApolloClient({
  // uri: process.env.REACT_APP_PROXY_HOST + '/graphql',
  uri: 'https://scanditask-75dbb522c7f0.herokuapp.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ["id"],
      },
      AttributeSet: {
        keyFields: ["id", "productId"],
      },
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </ApolloProvider>
);