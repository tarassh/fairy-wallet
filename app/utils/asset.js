const numeral = require('numeral');

function assetToNumber(asset, finite = false, defaultValue = 0) {
  if (typeof asset === 'string') {
    const [amount] = asset.split(' ');
    let n = parseFloat(amount);
    if (finite) {
      n *= 10000;
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
    const formattedAmount =
      amount >= 100000
        ? numeral(amount).format('0a')
        : numeral(amount).format('0,0.0000');
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
