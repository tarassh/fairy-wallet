// @flow
import * as types from './types';

import eos from './helpers/eos';
import serialize from './helpers/ledgerserialize';

// from: cryptofairy1, to: account, asset: 100.0000 EOS, memo: blah blah (e.g. 100 symbols)
export function transfer(from, to, asset, memo = '') { 
  return (dispatch: () => void, getState) => {
    const {
      connection,
      account
    } = getState();

    const modified = {
      ...connection,
      sign: false
    };

    eos(modified).createTransaction(120, (error, headers) => {
      console.log(headers);
    });

    console.log(eos(modified));

    const obj = {
      "from": from,
      "to": to,
      "quantity": asset,
      "memo": memo
    };
    let fc = eos(modified).fc;
    console.log(fc);

    return eos(modified).transaction('eosio.token', contract => {
      contract.transfer(
        from,
        to,
        asset,
        memo
      );
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: 60 * 60,
      sign: connection.sign
    }).then((tx) => {
      var buffer = serialize(fc.types, fc.structs.transfer.fields, tx.transaction.transaction);
      console.log(buffer.toString('hex'));
    }).catch((err) => {
      console.log(err);
    });
  };
}

export default {
  transfer
}