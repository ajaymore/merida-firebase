import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store, { initAuth } from './configureStore';
import config from './firebase-config';

initializeIcons();
firebase.initializeApp(config);
store.dispatch(initAuth());

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  const token = firebase.auth().currentUser
    ? await firebase.auth().currentUser.getIdToken()
    : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Fabric>
          <App />
        </Fabric>
      </ApolloProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
