// @flow
import * as types from './types';

const Api = require('./helpers/eosledjer').default;
const Transport = require("@ledgerhq/hw-transport-node-hid").default;

export function startListen() {
  return (dispatch: () => void, getState) => {
    const currentState = getState();

    dispatch({
      type: types.APP_LEDGER_CONNECTION_STATUS,
      deviceConnected: !!currentState.ledger.transport
    });

    if (getState().ledger.subscriber !== null) {
      return;
    }

    const subscriber = Transport.listen({
      next: (event) => {
        if (event.type === 'add') {
          if (getState().ledger.devicePath === null) {

            if (getState().ledger.devicePath !== event.device.path && getState().ledger.publicKey === null) {
              dispatch(stopListen());

              Transport.open(event.device.path).then((transport) => {
                transport.setDebugMode(true);
                const api = new Api(transport);
                api.getAppConfiguration().then((result) => {
                  // transport.close();

                  dispatch({
                    type: types.GET_APP_STATS_SUCCESS,
                    application: result,
                    transport
                  });

                  dispatch(startListen());
                  return result;
                }).catch((err) => {
                  transport.close();

                  dispatch({
                    type: types.GET_APP_STATS_FAILURE,
                    err
                  });

                  dispatch(startListen());
                });
                return transport;
              }).catch((err) => {
                console.log(err);
                dispatch(startListen());
              });
            }

            dispatch({
              type: types.DEVICE_CONNECTED,
              devicePath: event.device.path
            });
          }


        } else if (event.type === 'remove') {
          dispatch({ type: types.DEVICE_DISCONNECTED });
        }
      }
    });

    dispatch({
      type: types.START_LISTEN_DEVICE_EVENTS,
      subscriber
    });
  };
}

export function stopListen() {
  return (dispatch: () => void, getState) => {
    const { ledger } = getState();
    if (ledger.subscriber !== null) {
      ledger.subscriber.unsubscribe();

      dispatch({
        type: types.STOP_LISTEN_DEVICE_EVENTS
      });
    }
  };
}

export default {
  startListen,
  stopListen
};