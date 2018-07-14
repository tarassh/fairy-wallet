// @flow
import * as types from './types';
import { getCurrencyBalance } from './accounts';

const EOS = 'EOS';

export function setupNativeToken() {
    return (dispatch: () => void, getState) => {
        const {
            accounts,
            settings
        } = getState();
        
        const account = accounts.names[accounts.activeAccount];
        let tokens = settings.tokens[account] || [];
        if (!tokens.includes(EOS)){
           dispatch({
            type: types.ADD_TOKEN,
            account,
            token: EOS
           }) 
        }
        
        if (!accounts.balances[EOS]){
            getCurrencyBalance(account);
        }
    }
}

export function addToken(account, token) {
    return (dispatch: () => void, getState) => {
        const {
            accounts,
            settings
        } = getState();
        
        let tokens = settings.tokens[accounts.names[accounts.activeAccount]] || [];
        if (!tokens.includes('EOS')){
           dispatch({
            type: types.ADD_TOKEN,
            account,
            token: 'EOS'
           }) 
        }
        
        if (settings.balances[token])
        
        if (!token) return;
        
        dispatch({
            type: types.ADD_TOKEN,
            account,
            token: token.toUpperCase()
        })
    }
}

export default {
    addToken,
    setupNativeToken
};