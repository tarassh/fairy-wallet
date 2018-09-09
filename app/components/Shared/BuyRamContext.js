import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {},
  showDetails: boolean
};

class BuyRamContext extends Component<Props> {
  renderText = () => {
    const { context } = this.props;
    return (
      <p className="dashed-border">
        You are about to buy RAM for <strong>{context.tokens}</strong> to{' '}
        <strong>{context.recipient}</strong>. Transaction details are listed
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
            <Table.Cell>Buyer</Table.Cell>
            <Table.Cell>Receiver</Table.Cell>
            <Table.Cell>Tokens</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{context.contract}</Table.Cell>
            <Table.Cell>{context.action}</Table.Cell>
            <Table.Cell>{context.buyer}</Table.Cell>
            <Table.Cell>{context.recipient}</Table.Cell>
            <Table.Cell>{context.tokens}</Table.Cell>
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

export default BuyRamContext;
