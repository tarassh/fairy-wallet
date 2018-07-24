function assetToNumber(asset) {
  const [amount] = asset.split(' ');
  return parseFloat(amount);
}

function numberToAsset(amount, symbol = 'EOS') {
  return `${parseFloat(amount).toFixed(4)} ${symbol}`;
}

export default {
  assetToNumber,
  numberToAsset
};
