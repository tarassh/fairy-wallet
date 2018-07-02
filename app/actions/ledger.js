
// @flow
import * as types from './types';

const Api = require('./helpers/eosledjer').default;

export function startListen() {
    return (dispatch: () => void) => {
        dispatch({
            type: types.START_LISTEN_DEVICE_EVENTS
        });
    };
}

export function stopListen() {
    return (dispatch: () => void) => {
        dispatch({
            type: types.STOP_LISTEN_DEVICE_EVENTS
        });
    };
}

export function getPublicKey(device) {
    return (dispatch: () => void) => {
        dispatch({
            type: types.GET_PUBLIC_KEY_REQUEST
        });

        // const api = new Api(device);
        device.getPublicKey("44'/194'/0'/0/0", false, false).then(result => {
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

export function getAppConfiguration(device) {
    return (dispatch: () => void) => {
        dispatch({
            type: types.GET_APP_INFO_REQUEST
        });

        const api = new Api(device);
        api.getAppConfiguration().then(result => {
            dispatch({
                type: types.GET_APP_INFO_SUCCESS
            });
            return result;
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_APP_INFO_FAILURE,
                statusCode: err.statusCode
            });
        });
    }
}

export default {
    getPublicKey
};