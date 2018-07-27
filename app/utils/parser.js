import _ from 'lodash';
import { assetToNumber, numberToAsset } from './asset';

const account = '[a-z12345.]{1,12}';
const asset = '([0-9]+([.][0-9]{0,4})?|[.][0-9]{1,4}) [A-Z]{1,8}';

const transfer = new RegExp(`^from ${account} to ${account} quantity ${asset} memo (.+)?$`);
const undelegatebw = new RegExp(`^from ${account} receiver ${account} unstake_net_quantity ${asset} unstake_cpu_quantity ${asset}$`);
const delegatebw = new RegExp(`^from ${account} receiver ${account} stake_net_quantity ${asset} stake_cpu_quantity ${asset} transfer [0-9]+$`);
const buyram = new RegExp(`^payer ${account} receiver ${account} quant ${asset}$`);

const re = {
  account,
  asset,
  transfer,
  undelegatebw,
  delegatebw,
  buyram
}

const fn = {
  transfer: (action, participant) => {
    const { from, to, quantity } = action.data;
    if (from === participant) {
      return {
        desc: `to ${to}`,
        quantity: `-${quantity}`
      }
    }
    if (to === participant) {
      return {
        desc: `from ${from}`,
        quantity: `+${quantity}`
      }
    }
    return defaultV;
  },

  delegatebw: (action) => {
    const { stake_net_quantity, stake_cpu_quantity } = action.data; // eslint-disable-line camelcase
    return {
      desc: 'Staked',
      quantity: numberToAsset(assetToNumber(stake_net_quantity) + assetToNumber(stake_cpu_quantity))
    }
  },

  undelegatebw: (action) => { 
    const { unstake_net_quantity, unstake_cpu_quantity } = action.data; // eslint-disable-line camelcase
    return {
      desc: 'Unstaked',
      quantity: numberToAsset(assetToNumber(unstake_net_quantity) + assetToNumber(unstake_cpu_quantity))
    }
  },

  buyram: (action) => {
    const { quant } = action.data;
    return {
      desc: 'Buy RAM',
      quantity: `-${quant}`
    }
  }
}

const defaultV = {
  desc: undefined,
  quantity: undefined
}

function parseAction(action, participant) {
  const { name, data } = action;
  let args = '';
  _.forEach(data, (value, key) => {
    args = `${args} ${key} ${value}`;
  });
  args = args.trimLeft();

  if (re[name] && re[name].test(args)) {
    return fn[name](action, participant);
  }

  return defaultV;
}

export default {
  parseAction,
  re,
  fn
}