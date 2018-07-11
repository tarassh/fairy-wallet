// @flow
import * as types from './types';

export function addToken(token) {
    return (dispatch: () => void) => {
        dispatch({
            type: types.BALANCE_ADD_TOKEN,
            token: token
        })
    }
}

export default {
    addToken
};