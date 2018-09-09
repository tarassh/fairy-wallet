import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {},
  showDetails: boolean
};

class TransferContext extends Component<Props> {
  renderText = () => {
    const { context } = this.props;
    return (
      <p className="dashed-border">
        You are about to transfer <strong>{context.asset}</strong> tokens to{' '}
        <strong>{context.to}</strong> account. Transaction details are listed
        below.
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
            <Table.Cell>To</Table.Cell>
            <Table.Cell>Quantity</Table.Cell>
            <Table.Cell>Memo</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{context.contract}</Table.Cell>
            <Table.Cell>{context.action}</Table.Cell>
            <Table.Cell>{context.from}</Table.Cell>
            <Table.Cell>{context.to}</Table.Cell>
            <Table.Cell>{context.asset}</Table.Cell>
            <Table.Cell>{context.memo}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
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

export default TransferContext;
