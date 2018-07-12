// @flow
import * as types from './types';

export function addToken(account, token) {
    return (dispatch: () => void) => {
        dispatch({
            type: types.ADD_TOKEN,
            account,
            token
        })
    }
}

export default {
    addToken
};