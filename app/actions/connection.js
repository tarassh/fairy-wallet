// @flow
import * as types from './types';
import { getAccounts } from './accounts';

import eos from './helpers/eos';

export function test(url) {
    return function(dispatch) {
        dispatch({
            type: 'dfgdfgdgdgdf'
        }); 
    }
};

export function createConnection(url) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.CREATE_CONNECTION_PENDING,
      url
    });

    if (!url || url.length === 0) {
      return;
    }

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
        httpEndpoint,
        sign: false
      };

      eos(modified).getInfo({}).then((result) => {
        if (result.head_block_num > 0) {
          dispatch({
            type: types.CREATE_CONNECTION_SUCCESS,
            httpEndpoint
          });
            
            return dispatch(getAccounts(getState().ledger.publicKey))
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
    createConnection,
    test
}