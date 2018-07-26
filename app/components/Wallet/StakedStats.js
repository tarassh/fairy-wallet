import React, { Component } from 'react';
import { Table, TableBody, Header } from 'semantic-ui-react';
import { numberToAsset } from '../../utils/asset';

const pretty = require('prettysize');

type Props = {
  account: {}
};

class StakedStats extends Component<Props> {
  render() {
    const { account } = this.props;
    const {
      cpu_limit, // eslint-disable-line camelcase
      net_limit, // eslint-disable-line camelcase
      self_delegated_bandwidth, // eslint-disable-line camelcase
      total_resources, // eslint-disable-line camelcase
      refund_request // eslint-disable-line camelcase
    } = account;

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
              <Table.Cell width={4}>
                total
                <p>{total_resources.cpu_weight}</p>
              </Table.Cell>
              <Table.Cell width={4}>
                staked
                <p>
                  {self_delegated_bandwidth === null ? numberToAsset(0) : self_delegated_bandwidth.cpu_weight} 
                </p> 
              </Table.Cell>
              {!!refund_request && ( // eslint-disable-line camelcase
                <Table.Cell width={4}>
                  unstaking
                  <p>{refund_request.cpu_amount}</p>
                </Table.Cell>
              )}
              <Table.Cell width={4}>
                usage
                <p>
                  {(cpu_limit.used / 1000000).toFixed(4)} sec /{' '}
                  {(cpu_limit.max / 1000000).toFixed(4)} sec
                </p>
              </Table.Cell>
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
              <Table.Cell width={4}>
                total<p>{total_resources.net_weight}</p>
              </Table.Cell>
              <Table.Cell width={4}>
                staked<p>{self_delegated_bandwidth === null ? numberToAsset(0) : self_delegated_bandwidth.net_weight}</p>
              </Table.Cell>
              {!!refund_request && ( // eslint-disable-line camelcase
                <Table.Cell width={4}>
                  unstaking
                  <p>{refund_request.net_amount}</p>
                </Table.Cell>
              )}
              <Table.Cell width={4}>
                usage
                <p>
                  {pretty(parseInt(net_limit.used, 10))} /{' '}
                  {pretty(parseInt(net_limit.max, 10))}
                </p>
              </Table.Cell>
            </Table.Row>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default StakedStats;
