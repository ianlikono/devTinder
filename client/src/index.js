
import 'antd/dist/antd.css';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import client from './apollo';
import App from './App';
import Nav from './components/Nav';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Nav />
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
