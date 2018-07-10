import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerActions, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import * as ledgerActions from '../actions/ledger';
import * as stateActions from '../actions/states';
import * as connectionActions from '../actions/connection';
import * as accountsActions from '../actions/accounts';

const history = createHashHistory();
//const history = createHistory();

const configureStore = (initialState = {}) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...ledgerActions,
    ...routerActions,
    ...stateActions,
    ...connectionActions,
    ...accountsActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);
    
  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

    history.push('/');
    
  return store;
};

export default { configureStore, history };
