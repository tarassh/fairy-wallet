// @flow
import React, { Component } from 'react';
import { Table, TableBody, Header } from 'semantic-ui-react';
import { numberToPrettyAsset, assetToNumber } from '../../utils/asset';

const pretty = require('prettysize');

type Props = {
  account: {}
};

class StakedStats extends Component<Props> {
  render() {
    const { account } = this.props;
    const { totalResources, selfDelegated, usage, ram } = formatStats(account);

    return (
      <div>
        <Header
          size="tiny"
          textAlign="center"
          dividing
          style={{ marginBottom: '0em', marginTop: '1em' }}
        >
          <h5>CPU</h5>
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
                  <h5>Usage</h5>
                  <h5>{usage.cpu}</h5>
                </Table.Cell>
              )}
            </Table.Row>
          </TableBody>
        </Table>
        <Header
          size="tiny"
          textAlign="center"
          dividing
          style={{ marginBottom: '0em', marginTop: '2em' }}
        >
          <h5>Network</h5>
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
                  <h5>Usage</h5>
                  <h5>{usage.net}</h5>
                </Table.Cell>
              )}
            </Table.Row>
          </TableBody>
        </Table>
        <Header
          size="tiny"
          textAlign="center"
          dividing
          style={{ marginBottom: '0em', marginTop: '2em' }}
        >
          <h5>RAM</h5>
        </Header>
        <Table basic="very" style={{ marginTop: '0em' }}>
          <TableBody>
            <Table.Row textAlign="center">
              {ram && (
                <Table.Cell width={16}>
                  <h5>Usage</h5>
                  <h5>{ram}</h5>
                </Table.Cell>
              )}
            </Table.Row>
          </TableBody>
        </Table>
      </div>
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

    const cpu = `${(cpu_limit.used / 1000000).toFixed(4)} s / ${(
      cpu_limit.max / 1000000
    ).toFixed(4)} s`;

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

export default StakedStats;
