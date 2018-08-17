// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { Table, TableBody, Header, Segment } from 'semantic-ui-react';
import { numberToPrettyAsset, assetToNumber } from '../../utils/asset';
import UtilityChart from '../Shared/UtilityChart';
import StakeChart from '../Shared/StakeChart';

const pretty = require('prettysize');
const numeral = require('numeral');

type Props = {
  account: {},
  delegates: {},
  delegatee: any
};

class StakedStats extends Component<Props> {
  renderDelegate() {
    const { delegates, account, delegatee } = this.props;
    const refunds = unstakingBalance(account);

    const active = _.findIndex(delegates, el => el.to === delegatee);
    
    const cpuStakes = _.map(delegates, el => assetToNumber(el.cpu_weight));
    const cpuStake = _.sum(cpuStakes);

    const netStakes = _.map(delegates, el => assetToNumber(el.net_weight));
    const netStake = _.sum(netStakes);

    const cpuRefund = refunds.cpu;
    const netRefund = refunds.net;

    return (
      <div>
        <StakeChart stakes={cpuStakes} max={cpuStake + cpuRefund} active={active} />
        <p>Staked CPU {parseFloat(cpuStake).toFixed(4)}</p>
        
        <StakeChart stakes={[cpuRefund]} max={cpuStake + cpuRefund} />
        <p>Refund CPU {parseFloat(cpuRefund).toFixed(4)}</p>

        <StakeChart stakes={netStakes} max={netStake + netRefund} active={active} />
        <p>Staked NET {parseFloat(netStake).toFixed(4)}</p>
        
        <StakeChart stakes={[netRefund]} max={netStake + netRefund} />
        <p>Refund NET {parseFloat(netRefund).toFixed(4)}</p>
      </div>
    )
  }

  render() {
    const { account } = this.props;
    const { totalResources, selfDelegated, usage, ram } = formatStats(account);

    return (
      <Segment>
        {this.renderDelegate()}
        <Header
          size="tiny"
          textAlign="center"
          style={{ marginBottom: '0em', marginTop: '0em' }}
        >
          <h5>CPU</h5>
          <UtilityChart stats={{used: account.cpu_limit.used, max: account.cpu_limit.max }} />
        </Header>
        <Table basic="very" style={{ marginTop: '0em' }}>
          <TableBody>
            <Table.Row textAlign="center">
              {totalResources && (
                <Table.Cell width={4}>
                  <h5>Total</h5>
                  <h5>{totalResources.cpu}</h5>
                </Table.Cell>
              )}
              {selfDelegated && (
                <Table.Cell width={4}>
                  <h5>Staked</h5>
                  <h5>{selfDelegated.cpu} </h5>
                </Table.Cell>
              )}
              {usage && (
                <Table.Cell width={4}>
                  <h5>Used</h5>
                  <h5>{usage.cpu}</h5>
                </Table.Cell>
              )}
            </Table.Row>
          </TableBody>
        </Table>
        <Header
          size="tiny"
          textAlign="center"
          style={{ marginBottom: '0em', marginTop: '0.5em' }}
        >
          <h5>Network</h5>
          <UtilityChart stats={{used: account.net_limit.used, max: account.net_limit.max }} />
        </Header>
        <Table basic="very" style={{ marginTop: '0em' }}>
          <TableBody>
            <Table.Row textAlign="center">
              {totalResources && (
                <Table.Cell width={4}>
                  <h5>Total</h5>
                  <h5>{totalResources.net}</h5>
                </Table.Cell>
              )}
              {selfDelegated && (
                <Table.Cell width={4}>
                  <h5>Staked</h5>
                  <h5>{selfDelegated.net}</h5>
                </Table.Cell>
              )}
              {usage && (
                <Table.Cell width={4}>
                  <h5>Used</h5>
                  <h5>{usage.net}</h5>
                </Table.Cell>
              )}
            </Table.Row>
          </TableBody>
        </Table>
        <Header
          size="tiny"
          textAlign="center"
          style={{ marginBottom: '0em', marginTop: '0.5em' }}
        >
          <h5>RAM</h5>
          <UtilityChart stats={{used: account.ram_usage, max: account.ram_quota }} />
        </Header>
        <Table basic="very" style={{ marginTop: '0em', marginBottom: '0em' }}>
          <TableBody>
            <Table.Row textAlign="center">
              {ram && (
                <Table.Cell width={16}>
                  <h5>Used</h5>
                  <h5>{ram}</h5>
                </Table.Cell>
              )}
            </Table.Row>
          </TableBody>
        </Table>
      </Segment>
    );
  }
}

function formatStats(account) {
  const {
    cpu_limit, // eslint-disable-line camelcase
    net_limit, // eslint-disable-line camelcase
    self_delegated_bandwidth, // eslint-disable-line camelcase
    total_resources, // eslint-disable-line camelcase
    ram_quota, // eslint-disable-line camelcase
    ram_usage // eslint-disable-line camelcase
  } = account;

  const result = {};

  if (total_resources && total_resources !== null) {
    // eslint-disable-line camelcase
    const totalResources = {};
    const cpu = assetToNumber(total_resources.cpu_weight);
    const net = assetToNumber(total_resources.net_weight);
    totalResources.cpu = numberToPrettyAsset(cpu);
    totalResources.net = numberToPrettyAsset(net);
    Object.assign(result, { totalResources });
  }

  if (self_delegated_bandwidth && self_delegated_bandwidth !== null) {
    // eslint-disable-line camelcase
    const selfDelegated = {};
    const cpu = assetToNumber(self_delegated_bandwidth.cpu_weight);
    const net = assetToNumber(self_delegated_bandwidth.net_weight);
    selfDelegated.cpu = numberToPrettyAsset(cpu);
    selfDelegated.net = numberToPrettyAsset(net);
    Object.assign(result, { selfDelegated });
  }

  if (cpu_limit && cpu_limit !== null && net_limit && net_limit !== null) {
    // eslint-disable-line camelcase
    const usage = {};

    const cpu = numeral(cpu_limit.used/cpu_limit.max).format('0.00%');

    const net = `${pretty(parseInt(net_limit.used, 10))} / ${pretty(
      parseInt(net_limit.max, 10)
    )}`;
    usage.cpu = cpu;
    usage.net = net;
    Object.assign(result, { usage });
  }

  if (ram_quota && ram_quota !== null && ram_usage && ram_usage !== null) {
    // eslint-disable-line camelcase
    const ram = `${pretty(ram_usage)} / ${pretty(ram_quota)}`;
    Object.assign(result, { ram });
  }

  return result;
}

function unstakingBalance(account) {
  const request = account.refund_request;
  if (request && request !== null) {
    const requestTime = new Date(request.request_time);
    requestTime.setDate(requestTime.getDate() + 3);
    if (requestTime - Date.now() < 0) return { cpu: 0, net: 0 };
    return {
      cpu: assetToNumber(request.cpu_amount),
      net: assetToNumber(request.net_amount)
    };
  }
  return { cpu: 0, net: 0 };
}

export default StakedStats;
