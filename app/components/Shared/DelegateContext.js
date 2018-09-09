import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { assetToNumber, numberToAsset } from '../../utils/asset';

type Props = {
  context: {},
  showDetails: boolean
};

class DelegateContext extends Component<Props> {
  renderText = () => {
    const { context } = this.props;
    const actionName = context.action === 'delegatebw' ? 'delegate' : 'undelegate';
    const total = assetToNumber(context.net) + assetToNumber(context.cpu);
    return (
      <p className="dashed-border">
        You are about to {actionName} <strong>{numberToAsset(total)}</strong>{' '}
        totally,&nbsp;
        <strong>{context.cpu}</strong> for CPU and{' '}
        <strong>{context.net}</strong> for Network respectively. Transaction
        details are listed below.
      </p>
    );
  }

  renderDetails = () => {
    const { context } = this.props;
    return (
      <Table basic="very" className="verify-content">
        <Table.Body>
          <Table.Row>
            <Table.Cell width={3}>Contract</Table.Cell>
            <Table.Cell>Action</Table.Cell>
            <Table.Cell>From</Table.Cell>
            <Table.Cell>Receiver</Table.Cell>
            <Table.Cell>Network</Table.Cell>
            <Table.Cell>CPU</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{context.contract}</Table.Cell>
            <Table.Cell>{context.action}</Table.Cell>
            <Table.Cell>{context.from}</Table.Cell>
            <Table.Cell>{context.receiver}</Table.Cell>
            <Table.Cell>{context.net}</Table.Cell>
            <Table.Cell>{context.cpu}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  render() {
    const { context, showDetails } = this.props;

    let content;
    if (context !== null) {
      content = (
        <div>
          {this.renderText()}
          {showDetails && this.renderDetails()}
        </div>
      );
    }

    return content;
  }
}

export default DelegateContext;
