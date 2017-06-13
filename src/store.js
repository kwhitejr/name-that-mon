import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { BrowserHistory } from 'react-history';

import rootReducer from './reducers';

const router = routerMiddleware(BrowserHistory);

const middleware = [thunk, router];

const enhancers = compose(
  applyMiddleware(...middleware),
  (window.devToolsExtension && process.env.NODE_ENV !== 'production') ?
    window.devToolsExtension() : f => f
);

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, enhancers); 

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')) 
    );
  }

  return store;
}
