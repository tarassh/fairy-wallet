function assetToNumber(asset, defaultValue=0) {
  if (typeof asset === 'string') {
    const [amount] = asset.split(' ');
    return parseFloat(amount);
  }
  return defaultValue;
}

function numberToAsset(amount, symbol = 'EOS', defaultValue='0.000') {
  if (isNumber) {
    return `${parseFloat(amount).toFixed(4)} ${symbol}`;
  }
  return `${defaultValue} ${symbol}`;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  assetToNumber,
  numberToAsset
};
