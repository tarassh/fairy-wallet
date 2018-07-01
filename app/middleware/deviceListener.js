// @flow
import * as types from '../actions/types';
import * as ledger from "../actions/ledger";

const Transport = require("@ledgerhq/hw-transport-node-hid").default;

const deviceListenerMiddleware = store => next => action => {
    if (action.type === types.START_LISTEN_DEVICE_EVENTS) {
        action.interval = setInterval(() => {
            Transport.list().then(devices => {
                const state = store.getState();

                if (state.ledger.isConnected && devices.length === 0) {
                    store.dispatch(ledger.deviceDisconnected())
                }

                if (!state.ledger.isConnected && devices.length > 0) {
                    Transport.open(devices[0]).then(transport => {
                        transport.setDebugMode(true);
                        store.dispatch(ledger.deviceConnected(transport));
                        return transport;
                    }).catch();
                }

                return devices;
            }).catch();
        }, 2000);
    } else if (action.type === types.STOP_LISTEN_DEVICE_EVENTS) {
        clearInterval(action.interval);
    }
    next(action);
};

export default deviceListenerMiddleware;