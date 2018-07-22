import React, { Component } from 'react';
import { Button, Label, Icon, Popup, Header, Table } from 'semantic-ui-react';

const pretty = require('pretty-time');

type Props = {
  account: {}
};

class BalanceComponent extends Component<Props> {
  render() {
    const { account } = this.props;

    let timeLeft = '';

    const { total, liquid, staked, unstaking } = balanceStats(account);
    if (unstaking) {
      const { refund_request } = account; // eslint-disable-line camelcase
      timeLeft = new Date(refund_request.request_time);
      timeLeft.setDate(timeLeft.getDate() + 3);
      timeLeft = pretty(timeLeft.getTime() * 100);
    }

    const content = (
      <div>
        <Header as="h5" content="EOS Balance" />
        <Table basic="very">
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="left">Total</Table.Cell>
              <Table.Cell textAlign="right">{total}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="left">Liquid</Table.Cell>
              <Table.Cell textAlign="right">{liquid}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="left">Staked</Table.Cell>
              <Table.Cell textAlign="right">{staked}</Table.Cell>
            </Table.Row>
            {unstaking && (
              <Table.Row>
                <Table.Cell>Unstaking</Table.Cell>
                <Table.Cell>{`${timeLeft} ${unstaking}`}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    );

    return (
      <div>
        <Popup
          content={content}
          on="click"
          trigger={
            <Button as="div" labelPosition="right" onClick={this.toggle}>
              <Button icon="dollar" basic />
              <Label as="div" basic style={{ borderRadius: 'unset' }}>
                <Icon name="lock open" color="grey" />
                {liquid}
              </Label>
              <Label
                as="div"
                basic
                style={unstaking ? { borderRadius: 'unset' } : {}}
              >
                <Icon name="lock" color="grey" />
                {staked}
              </Label>
              {!!unstaking && (
                <Label as="div" basic>
                  <Icon name="clock" color="grey" />
                  {`${unstaking} [${timeLeft}]`}
                </Label>
              )}
            </Button>
          }
        />
      </div>
    );
  }
}

function balanceStats(account) {
  const staked = account.voter_info.staked / 10000;
  const unstaking = totalRefund(account.refund_request);
  const liquid = assetToFloat(account.core_liquid_balance);
  const total = staked + unstaking + liquid;

  const stats = {
    total: `${parseFloat(total).toFixed(4)} EOS`,
    liquid: `${parseFloat(liquid).toFixed(4)} EOS`,
    staked: `${parseFloat(staked).toFixed(4)} EOS`
  };

  if (unstaking > 0) {
    Object.assign(stats, {
      unstaking: `${parseFloat(unstaking).toFixed(4)} EOS`
    });
  }
  return stats;
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
