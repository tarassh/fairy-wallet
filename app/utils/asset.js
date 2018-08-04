const numeral = require('numeral');
const exactMath = require('exact-math');

function assetToNumber(asset, finite = false, defaultValue = 0) {
  if (typeof asset === 'string') {
    const [amount] = asset.split(' ');
    const n = parseFloat(amount.replace(',', ''));
    if (finite) {
      return exactMath.mul(n, 10000);
    }

    return n;
  }
  return defaultValue;
}

function numberToAsset(amount, symbol = 'EOS', defaultValue = '0.0000') {
  if (isNumber(amount)) {
    return `${parseFloat(amount).toFixed(4)} ${symbol}`;
  }
  return `${defaultValue} ${symbol}`;
}

function numberToPrettyAsset(amount, symbol = 'EOS', defaultValue = '0.0000') {
  if (isNumber(amount)) {
    let formattedAmount = numeral(amount).format('0.0000');
    if (amount >= 100000) {
      formattedAmount = numeral(amount).format('0a');
    } else if (amount >= 1000) {
      formattedAmount = numeral(amount).format('0,0.0');
    }

    return `${formattedAmount} ${symbol}`;
  }

  return `${defaultValue} ${symbol}`;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n); // eslint-disable-line no-restricted-globals
}

export default {
  assetToNumber,
  numberToAsset,
  numberToPrettyAsset
};
