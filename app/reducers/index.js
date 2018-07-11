// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import states from './states';
import ledger from './ledger';
import connection from './connection';
import accounts from './accounts';
import settings from './settings';

const rootReducer = combineReducers({
    ledger,
    states,
    connection,
    accounts,
    router,
    settings
});

export default rootReducer;
