// @flow
import * as types from '../actions/types';

const Api = require('../actions/helpers/eosledjer').default;
const Transport = require("@ledgerhq/hw-transport-node-hid").default;

const deviceListenerMiddleware = store => next => action => {
    if (action.type === types.START_LISTEN_DEVICE_EVENTS) {
        let sub = null;
        action.interval = setInterval(() => {
            if (sub === null) {
                sub = Transport.listen({
                    next: e => {
                        const { ledger } = store.getState();
                        store.dispatch({
                            type: types.DEVICE_CONNECTED,
                            devicePath: e.device.path
                        });

                        if (e.type === 'add' && (ledger.devicePath !== e.device.path && ledger.publicKey === null)) {
                            sub.unsubscribe();
                            sub = null;
        
                            Transport.open(e.device.path).then(transport => {
                                transport.setDebugMode(true);
                                const api = new Api(transport);
                                api.getPublicKey("44'/194'/0'/0/0").then(result => {
                                    transport.close();
        
                                    store.dispatch({
                                        type: types.GET_PUBLIC_KEY_SUCCESS, 
                                        publicKey: result
                                    });
                                
                                    return result;
                                }).catch(err => {
                                    console.log(err);
                                    transport.close();

                                    store.dispatch({
                                        type: types.GET_PUBLIC_KEY_FAILURE,
                                        publicKey: null
                                    })
                                });
                                return transport;
                            }).catch(err => {
                                console.log(err);
                            });
                        }
                        if (e.type === 'remove') {
                            store.dispatch({
                                type: types.DEVICE_DISCONNECTED,
                                
                            });
                        }
                    },
                });

                store.dispatch({
                    type: types.SET_DEVICE_SUBSCRIBER,
                    subscriber: sub
                });
            }
        }, 2000);
    } else if (action.type === types.STOP_LISTEN_DEVICE_EVENTS) {
        const { ledger } = store.getState();
        if (ledger.subscriber && {}.toString.call(ledger.subscriber) === '[object Function]') {
            ledger.subscriber.unsubscribe();
        }
        store.dispatch({
            type: types.SET_DEVICE_SUBSCRIBER,
            subscriber: null
        });
        clearInterval(action.interval);
    }
    next(action);
};

export default deviceListenerMiddleware;