// @flow
import * as types from './types';

export function getDeviceState (devicePath){
    return (dispatch: () => void) => {
        dispatch({ type: types.DEVICE_CONNECTING });
        if(!devicePath){
            return dispatch({
                type: types.DEVICE_DISCONNECTED
            });
        }
        return dispatch({
            type: types.DEVICE_CONNECTED,
            devicePath
        });
    }
}

export function getNodeState (node){
    return (dispatch: () => void) => {
        dispatch({ type: types.NODE_CONNECTING });
        if(!node){
            return dispatch({
                type: types.NODE_DISCONNECTED
            });
        }
        return dispatch({
            type: types.NODE_CONNECTED
        });
    }
}

export function getAccountState (account){
    return (dispatch: () => void) => {
        dispatch({ type: types.NO_ACCOUNT });
        if(!account){
            return dispatch({
                type: types.GET_ACCOUNTS_FAILED
            });
        }
        return dispatch({
            type: types.GET_ACCOUNTS_SUCCEDED
        });
    }
}