// @flow
import * as types from './types';
import { getCurrencyBalance } from './accounts';

export function addToken(account, token) {
    return (dispatch: () => void, getState) => {
        const {
            settings
        } = getState();
        
        if (!token) return;
        
        dispatch({
            type: types.ADD_TOKEN,
            account,
            token: token.toUpperCase()
        })
        
        if (!settings.balances[token]){
            getCurrencyBalance(account);
        }
    }
}

export default {
    addToken
};