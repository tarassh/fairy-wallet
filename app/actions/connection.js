// @flow
import * as types from './types';
import { getAccounts } from './accounts';

import eos from './helpers/eos';

export function createConnection(url) {
  return (dispatch: () => void, getState) => {
    if (!url || url.length === 0) {
      return;
    }

    dispatch({
      type: types.CREATE_CONNECTION_REQUEST,
      url
    });

    try {
      const {
        connection
      } = getState();

      let { host, protocol, path } = new URL(url);
      if (`${protocol}${path}` === url) {
        host = url;
        protocol = 'http:';
      }
      const httpEndpoint = `${protocol}//${host}`;

      const modified = {
        ...connection,
        httpEndpoint
      };

      eos(modified).getInfo({}).then((result) => {
        if (result.head_block_num > 0) {
          dispatch({
            type: types.CREATE_CONNECTION_SUCCESS,
            httpEndpoint,
            chainId: result.chain_id
          });

          return dispatch(getAccounts(getState().accounts.publicKey.wif));
        }
        return dispatch({
          type: types.CREATE_CONNECTION_FAILURE
        });
      }).catch((err) => {
        dispatch({
          type: types.CREATE_CONNECTION_FAILURE,
          err
        });
      });

    } catch (err) {
      return dispatch({
        type: types.CREATE_CONNECTION_FAILURE,
        err
      });
    }
  };
}

export default {
  createConnection
}