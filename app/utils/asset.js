function assetToNumber(asset, finite=false, defaultValue=0) {
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

function numberToAsset(amount, symbol = 'EOS', defaultValue='0.000') {
  if (isNumber(amount)) {
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
