
// @flow
import * as types from './types';

const Api = require('./helpers/eosledjer').default;


export function deviceConnected(device) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.GET_PUBLIC_KEY_REQUEST
        });

        const api = new Api(device);
        api.getPublicKey("44'/194'/0'/0/0", false, false).then(result => {
            console.log(result); 
        }).catch((err) => {
            dispatch({
                type: types.GET_PUBLIC_KEY_FAILURE,
                error: { err }
            });
        });

        dispatch({
            type: types.DEVICE_CONNECTED,
            device: device
        });
    };
}

export function deviceDisconnected(device) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.LEDGER_DEVICE_DISCONNETED,
            device: {}
        });
    };
}

export default {
    deviceConnected,
    deviceDisconnected
};