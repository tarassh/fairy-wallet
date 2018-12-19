// @flow
import * as types from './types';

const Api = require('./helpers/eosledjer').default;
const Transport = require('@ledgerhq/hw-transport-node-hid').default;

export function startListen() {
  return (dispatch: () => void, getState) => {
    const currentState = getState();

    dispatch({
      type: types.APP_LEDGER_CONNECTION_STATUS,
      deviceConnected: !!currentState.wallet.transport
    });

    if (getState().wallet.subscriber !== null) {
      return;
    }

    const subscriber = Transport.listen({
      next: event => {
        if (event.type === 'add') {
          if (getState().wallet.devicePath === null) {
            if (
              getState().wallet.devicePath !== event.device.path &&
              getState().wallet.application === null
            ) {
              dispatch(stopListen());

              Transport.open(event.device.path)
                .then(transport => {
                  if (process.env.NODE_ENV === 'development') {
                    transport.setDebugMode(true);
                  }

                  dispatch({
                    type: types.GET_APP_STATS_REQUEST
                  });

                  const api = new Api(transport);
                  api
                    .getAppConfiguration()
                    .then(result => {
                      dispatch({
                        type: types.GET_APP_STATS_SUCCESS,
                        application: result,
                        transport
                      });

                      dispatch(getPublicKey());
                      dispatch(startListen());
                      return result;
                    })
                    .catch(err => {
                      transport.close();

                      dispatch({
                        type: types.GET_APP_STATS_FAILURE,
                        err
                      });

                      dispatch(startListen());
                    });
                  return transport;
                })
                .catch(err => {
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
    const { wallet } = getState();
    if (wallet.subscriber !== null) {
      wallet.subscriber.unsubscribe();

      dispatch({
        type: types.STOP_LISTEN_DEVICE_EVENTS
      });
    }
  };
}

export function getPublicKey(display = false) {
  return (dispatch: () => void, getState) =>
    new Promise((resolve, reject) => {
      const { wallet } = getState();
      dispatch({
        type: display
          ? types.GET_PUBLIC_KEY_CONFIRM_REQUEST
          : types.GET_PUBLIC_KEY_REQUEST
      });

      const api = new Api(wallet.transport);
      api
        .getPublicKey(wallet.bip44Path, display)
        .then(result => {
          const type = display
            ? types.GET_PUBLIC_KEY_CONFIRM_SUCCESS
            : types.GET_PUBLIC_KEY_SUCCESS;
          dispatch({ type, publicKey: result });
          return resolve();
        })
        .catch(err => {
          const type = display
            ? types.GET_PUBLIC_KEY_CONFIRM_FAILURE
            : types.GET_PUBLIC_KEY_FAILURE;
          dispatch({ type, err });
          return reject();
        });
    });
}

export function getAppStats() {
  return (dispatch: () => void, getState) => {
    const { wallet } = getState();

    const api = new Api(wallet.transport);
    dispatch({ type: types.GET_APP_STATS_REQUEST });

    return api
      .getAppConfiguration()
      .then(result =>
        dispatch({
          type: types.GET_APP_STATS_SUCCESS,
          application: result,
          transport: wallet.transport
        })
      )
      .catch(err => dispatch({ type: types.GET_APP_STATS_FAILURE, err }));
  };
}

export default {
  startListen,
  stopListen,
  getAppStats,
  getPublicKey
};
