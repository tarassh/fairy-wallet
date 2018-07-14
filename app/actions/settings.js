// @flow
import * as types from './types';

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
        
        if (!token) return;
        
        dispatch({
            type: types.ADD_TOKEN,
            account,
            token: token.toUpperCase()
        })
    }
}

export default {
    addToken
};