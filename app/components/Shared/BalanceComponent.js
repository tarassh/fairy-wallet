import React, { Component } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';

const pretty = require('pretty-time');

type Props = {
  account: {}
};

class BalanceComponent extends Component<Props> {
  render() {
    const { account } = this.props;
    const staked = `${parseFloat(account.voter_info.staked / 10000).toFixed(
      4
    )} EOS`;
    const { refund_request } = account; // eslint-disable-line camelcase

    const refundTotal = totalRefund(refund_request);
    let timeLeft = 0;
    if (refundTotal > 0) {
      timeLeft = new Date(refund_request.request_time);
      timeLeft.setDate(timeLeft.getDate() + 3);
    }

    return (
      <Button as="div" labelPosition="right">
        <Button icon="dollar" basic />
        <Label as="div" basic style={{ borderRadius: 'unset' }}>
          <Icon name="lock open" color="grey" />
          {account.core_liquid_balance}
        </Label>
        <Label
          as="div"
          basic
          style={refundTotal > 0 ? { borderRadius: 'unset' } : {}}
        >
          <Icon name="lock" color="grey" />
          {staked}
        </Label>
        {refundTotal > 0 && (
          <Label as="div" basic>
            <Icon name="clock" color="grey" />
            {`${refundTotal.toFixed(4)} EOS [${pretty(
              timeLeft.getTime() * 100
            )}]`}
          </Label>
        )}
      </Button>
    );
  }
}

function totalRefund(request) {
  if (request && request !== null) {
    return assetToFloat(request.cpu_amount) + assetToFloat(request.net_amount);
  }
  return 0;
}

function assetToFloat(asset) {
  const [amount] = asset.split(' ');
  return parseFloat(amount);
}

export default BalanceComponent;
