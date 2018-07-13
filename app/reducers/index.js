// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import states from './states';
import ledger from './ledger';
import connection from './connection';
import accounts from './accounts';
import loading from './loading';
import settings from './settings';
import transaction from './transaction';

const rootReducer = combineReducers({
    ledger,
    states,
    connection,
    accounts,
    loading,
    settings,
    transaction,
    router
});

export default rootReducer;
