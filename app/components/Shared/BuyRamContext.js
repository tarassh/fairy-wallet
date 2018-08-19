import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {}
};

class BuyRamContext extends Component<Props> {
  render() {
    const { context } = this.props;
    const text = (
      <p className="dashed-border">
        You are about to buy RAM for <strong>{context.tokens}</strong> to{' '}
        <strong>{context.recipient}</strong>. Transaction details are listed
        below.
      </p>
    );

    let content = '';
    if (context !== null) {
      content = (
        <div>
          {text}
          <Table basic="very" attached="top">
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
        </div>
      );
    }

    return content;
  }
}

export default BuyRamContext;
