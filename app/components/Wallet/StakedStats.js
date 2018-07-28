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
    const { totalResources, selfDelegated, unstaking, usage } = formatStats(
      account
    );

    return (
      <div>
        <Header
          size="tiny"
          textAlign="center"
          dividing
          style={{ marginBottom: '0em', marginTop: '1em' }}
        >
          CPU
        </Header>
        <Table basic="very" style={{ marginTop: '0em' }}>
          <TableBody>
            <Table.Row textAlign="center">
              {totalResources && (
                <Table.Cell width={4}>
                  total
                  <p>{totalResources.cpu}</p>
                </Table.Cell>
              )}
              {selfDelegated && (
                <Table.Cell width={4}>
                  staked
                  <p>{selfDelegated.cpu} </p>
                </Table.Cell>
              )}
              {unstaking && (
                <Table.Cell width={4}>
                  unstaking
                  <p>{unstaking.cpu}</p>
                </Table.Cell>
              )}
              {usage && (
                <Table.Cell width={4}>
                  usage
                  <p>{usage.cpu}</p>
                </Table.Cell>
              )}
            </Table.Row>
          </TableBody>
        </Table>
        <Header
          size="tiny"
          textAlign="center"
          dividing
          style={{ marginBottom: '0em', marginTop: '3em' }}
        >
          Network
        </Header>
        <Table basic="very" style={{ marginTop: '0em' }}>
          <TableBody>
            <Table.Row textAlign="center">
              {totalResources && (
                <Table.Cell width={4}>
                  total<p>{totalResources.net}</p>
                </Table.Cell>
              )}
              {selfDelegated && (
                <Table.Cell width={4}>
                  staked<p>{selfDelegated.net}</p>
                </Table.Cell>
              )}
              {unstaking && (
                <Table.Cell width={4}>
                  unstaking
                  <p>{unstaking.net}</p>
                </Table.Cell>
              )}
              {usage && (
                <Table.Cell width={4}>
                  usage
                  <p>{usage.net}</p>
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
    refund_request // eslint-disable-line camelcase
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

  if (refund_request && refund_request !== null) {
    // eslint-disable-line camelcase
    const unstaking = {};
    const cpu = assetToNumber(refund_request.cpu_amount);
    const net = assetToNumber(refund_request.net_amount);
    unstaking.cpu = numberToPrettyAsset(cpu);
    unstaking.net = numberToPrettyAsset(net);
    Object.assign(result, { unstaking });
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

  return result;
}

export default StakedStats;
