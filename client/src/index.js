import 'antd/dist/antd.css';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import App from './App';
import Nav from './components/Nav';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Nav />
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
