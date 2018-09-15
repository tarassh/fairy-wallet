import _ from 'lodash';
import { assetToNumber, numberToAsset } from './asset';

const float = '([0-9]+([.][0-9]{0,4})?|[.][0-9]{1,4})';
const float2 = '([0-9]+([.][0-9]{0,6})?|[.][0-9]{1,6})';
const symbol = '[A-Z]{1,8}';
const account = '[a-z12345.]{1,12}';
const asset = `${float} ${symbol}`;
const asset2 = `${float2} ${symbol}`;

const transfer = new RegExp(
  `^from ${account} to ${account} quantity ${asset2} memo (.+)?$`
);
const undelegatebw = new RegExp(
  `^from ${account} receiver ${account} unstake_net_quantity ${asset} unstake_cpu_quantity ${asset}$`
);
const delegatebw = new RegExp(
  `^from ${account} receiver ${account} stake_net_quantity ${asset} stake_cpu_quantity ${asset} transfer [0-9]+$`
);
const buyram = new RegExp(
  `^payer ${account} receiver ${account} quant ${asset}$`
);

const voteproducer = new RegExp(
  `^voter ${account} proxy (${account}){0,1} producers\\s{0,1}((${account}),{0,1}){0,30}$`
);

const buyrambytes = new RegExp(
  `^payer ${account} receiver ${account} bytes [0-9]+$`
);

const sellram = new RegExp(`^account ${account} bytes [0-9]+$`);

const re = {
  symbol: new RegExp(`^${symbol}$`),
  float: new RegExp(`^${float}$`),
  float2: new RegExp(`^${float2}$`),
  float3: (precision) => { 
    const reFloat = new RegExp(`^([0-9]+([.][0-9]{0,${precision}})?|[.][0-9]{1,${precision}})$`);
    return reFloat;
  },
  account: new RegExp(`^${account}$`),
  asset: new RegExp(`^${asset}$`),
  transfer,
  undelegatebw,
  delegatebw,
  buyram,
  buyrambytes,
  sellram,
  voteproducer
};

const fn = {
  transfer: (action, participant) => {
    const { from, to, quantity } = action.data;
    if (from === participant) {
      return {
        desc: `to ${to}`,
        quantity: `-${quantity}`,
        prettyname: 'send'
      };
    }
    if (to === participant) {
      return {
        desc: `from ${from}`,
        quantity: `+${quantity}`,
        prettyname: 'receive'
      };
    }
    return defaultV;
  },

  delegatebw: action => {
    const { stake_net_quantity, stake_cpu_quantity, receiver } = action.data; // eslint-disable-line camelcase
    const amount = numberToAsset(
      assetToNumber(stake_net_quantity) + assetToNumber(stake_cpu_quantity)
    );
    return {
      desc: `to ${receiver}`,
      quantity: `-${amount}`,
      prettyname: 'delegate'
    };
  },

  undelegatebw: action => {
    const { unstake_net_quantity, unstake_cpu_quantity, from } = action.data; // eslint-disable-line camelcase
    const amount = numberToAsset(
      assetToNumber(unstake_net_quantity) + assetToNumber(unstake_cpu_quantity)
    );
    return {
      desc: `from ${from}`,
      quantity: `+${amount}`,
      prettyname: 'undelegate'
    };
  },

  buyram: action => {
    const { quant, receiver } = action.data;
    return {
      desc: `for ${receiver}`,
      quantity: `-${quant}`,
      prettyname: 'buy RAM'
    };
  },

  buyrambytes: action => {
    const { bytes, receiver } = action.data;
    return {
      desc: `${bytes} bytes for ${receiver}`,
      prettyname: 'buy RAM'
    };
  },

  sellram: action => {
    const { bytes } = action.data;
    return {
      desc: `${bytes} bytes`,
      prettyname: 'sell RAM'
    };
  },

  voteproducer: action => {
    const { producers } = action.data;
    return {
      desc: `for ${producers.length} producers`,
      prettyname: 'vote'
    };
  }
};

const defaultV = {
  desc: undefined,
  quantity: undefined,
  prettyname: undefined
};

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

  return Object.assign(defaultV, { prettyname: name });
}

export default {
  parseAction,
  re,
  fn
};
