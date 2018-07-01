
// @flow
import * as types from './types';

const Api = require('./helpers/eosledjer').default;

export function startListen() {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.START_LISTEN_DEVICE_EVENTS
        });
    };
}

export function stopListen() {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.STOP_LISTEN_DEVICE_EVENTS
        });
    };
}

export function deviceConnected(device) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.DEVICE_CONNECTED,
            device: device,
        });
    };
}

export function deviceDisconnected() {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.DEVICE_DISCONNECTED,
            device: {}
        });
    };
}

export function getPublicKey(device) {
    return (dispatch: () => void, getState) => {
        dispatch({
            type: types.GET_PUBLIC_KEY_REQUEST
        });

        const api = new Api(device);
        api.getPublicKey("44'/194'/0'/0/0", false, false).then(result => {
            dispatch({
                type: types.GET_PUBLIC_KEY_SUCCESS,
                publicKey:  result
            });
            return result;
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_PUBLIC_KEY_FAILURE,
                statusCode: err.statusCode
            });
        });
    }
}

export default {
    deviceConnected,
    deviceDisconnected,
    getPublicKey
};