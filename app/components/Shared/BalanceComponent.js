import React, { Component } from 'react';
import { Button, Label, Icon, Popup, Header, Table } from 'semantic-ui-react';

const moment = require('moment');

type Props = {
  account: {}
};

class BalanceComponent extends Component<Props> {
  render() {
    const { account } = this.props;

    const {
      total,
      liquid,
      staked,
      unstaking,
      unstakingTime,
      detailed
    } = balanceStats(account);

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
              <Table.Cell textAlign="left">Staked CPU</Table.Cell>
              <Table.Cell textAlign="right">{detailed.stakedCpu}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="left">Staked Net</Table.Cell>
              <Table.Cell textAlign="right">{detailed.stakedNet}</Table.Cell>
            </Table.Row>
            {unstaking && (
              <Table.Row>
                <Table.Cell>Unstaking CPU</Table.Cell>
                <Table.Cell>{`${unstakingTime} ${
                  detailed.unstakingCpu
                }`}</Table.Cell>
              </Table.Row>
            )}
            {unstaking && (
              <Table.Row>
                <Table.Cell>Unstaking Net</Table.Cell>
                <Table.Cell>{`${unstakingTime} ${
                  detailed.unstakingNet
                }`}</Table.Cell>
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
                  {`${unstaking} [${unstakingTime}]`}
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

  const detailed = {
    stakedCpu: account.self_delegated_bandwidth.cpu_weight,
    stakedNet: account.self_delegated_bandwidth.net_weight
  };

  if (unstaking > 0) {
    const timeLeft = new Date(account.refund_request.request_time);
    timeLeft.setDate(timeLeft.getDate() + 3);
    const time = moment(timeLeft).fromNow();

    Object.assign(stats, {
      unstaking: `${parseFloat(unstaking).toFixed(4)} EOS`,
      unstakingTime: time
    });

    Object.assign(detailed, {
      unstakingCpu: account.refund_request.cpu_amount,
      unstakingNet: account.refund_request.net_amount
    });
  }
  Object.assign(stats, { detailed });

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
