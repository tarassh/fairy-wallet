import React, { Component } from 'react';
import { Button, Label, Icon, Popup, Header, Table } from 'semantic-ui-react';
import {
  numberToAsset,
  assetToNumber,
  numberToPrettyAsset
} from '../../utils/asset';

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
                <Table.Cell>
                  {`${unstakingTime} ${detailed.unstakingCpu}`}
                </Table.Cell>
              </Table.Row>
            )}
            {unstaking && (
              <Table.Row>
                <Table.Cell>Unstaking Net</Table.Cell>
                <Table.Cell>
                  {`${unstakingTime} ${detailed.unstakingNet}`}
                </Table.Cell>
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
  const {
    refund_request,
    core_liquid_balance,
    self_delegated_bandwidth
  } = account; // eslint-disable-line camelcase
  const staked = stakedBalance(self_delegated_bandwidth);
  const unstaking = unstakingBalance(refund_request);
  const liquid = liquidBalance(core_liquid_balance);
  const total = staked + unstaking + liquid;

  const stats = {
    total: numberToPrettyAsset(total),
    liquid: numberToPrettyAsset(liquid),
    staked: numberToPrettyAsset(staked)
  };

  const detailed = selfDelegatedStats(self_delegated_bandwidth);

  if (unstaking > 0) {
    const timeLeft = new Date(account.refund_request.request_time);
    timeLeft.setDate(timeLeft.getDate() + 3);
    const time = moment(timeLeft).fromNow();

    Object.assign(stats, {
      unstaking: numberToAsset(unstaking),
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

function liquidBalance(liqidBalance) {
  if (liqidBalance && liqidBalance !== null) {
    return assetToNumber(liqidBalance);
  }
  return 0;
}

function stakedBalance(delegated) {
  if (delegated && delegated !== null) {
    return (
      assetToNumber(delegated.cpu_weight) + assetToNumber(delegated.net_weight)
    );
  }
  return 0;
}

function unstakingBalance(request) {
  if (request && request !== null) {
    return (
      assetToNumber(request.cpu_amount) + assetToNumber(request.net_amount)
    );
  }
  return 0;
}

function selfDelegatedStats(selfDelegated) {
  const stats = { stakedCpu: numberToAsset(0), stakedNet: numberToAsset(0) };
  if (selfDelegated && selfDelegated !== null) {
    stats.stakedCpu = selfDelegated.cpu_weight;
    stats.stakedNet = selfDelegated.net_weight;
  }
  return stats;
}

export default BalanceComponent;
