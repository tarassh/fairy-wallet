// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import ledger from './ledger';

const rootReducer = combineReducers({
  counter,
  ledger,
  router
});

export default rootReducer;
