import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {}
};

class TransferContext extends Component<Props> {
  render() {
    const { context } = this.props;
    const text = (
      <p>
        You are about to transfer <strong>{context.asset}</strong> tokens to{' '}
        <strong>{context.to}</strong> account. Transaction details are listed
        below.
      </p>
    );

    let content = '';
    if (context !== null) {
      content = (
        <div>
          {text}
          <Table basic attached="top">
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
        </div>
      );
    }

    return content;
  }
}

export default TransferContext;
