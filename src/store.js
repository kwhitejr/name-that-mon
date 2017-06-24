import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

/* "Reducer" is redux-speak for the set of functions that alter the application state. 
*  State-altering functions should be grouped by purpose, thus the application may have multiple reducers.
*  Our app is relatively straightforward, so we will likely only need one or two.
*  For example, we should have a Quiz reducer.
*/
import rootReducer from './reducers';

// There are multiple ways to do history in React, i.e. how to handle when a user selects Back in the browser rather than an in-app button.
export const history = createHistory()
const router = routerMiddleware(history);

// `thunk` is middleware that permits asynchronous actions within redux.
const middleware = [thunk, router];

// Devtools
const enhancers = compose(
  applyMiddleware(...middleware),
  (window.devToolsExtension && process.env.NODE_ENV !== 'production') ?
    window.devToolsExtension() : f => f
);

// The `store` is where Redux manages state 
export function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, enhancers); 

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')) 
    );
  }

  return store;
}
