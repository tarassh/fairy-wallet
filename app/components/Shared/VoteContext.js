import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {}
};

class VoteContext extends Component<Props> {
  render() {
    const { context } = this.props;
    const text = (
      <p>
        You are about to vote for <strong>{context.quantity}</strong>{' '}
        blockproducers. Transaction details are listed below.
      </p>
    );

    const totalPages =
      Math.floor(context.quantity / 8) + (context.quantity % 8 > 0 ? 1 : 0);

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
                <Table.Cell>Account</Table.Cell>
                <Table.Cell>[1] .. ${totalPages}</Table.Cell>
                {context.secondGroup && (
                  <Table.Cell>1 [2] .. ${totalPages}</Table.Cell>
                )}
                {context.thirdGroup && (
                  <Table.Cell>1 2 [3] .. ${totalPages}</Table.Cell>
                )}
                {context.fourthGroup && <Table.Cell>1 2 3 [4]</Table.Cell>}
              </Table.Row>
              <Table.Row>
                <Table.Cell>{context.contract}</Table.Cell>
                <Table.Cell>{context.action}</Table.Cell>
                <Table.Cell>{context.account}</Table.Cell>
                <Table.Cell>{context.firsGroup}</Table.Cell>
                {context.secondGroup && (
                  <Table.Cell>{context.secondGroup}</Table.Cell>
                )}
                {context.thirdGroup && (
                  <Table.Cell>{context.thirdGroup}</Table.Cell>
                )}
                {context.fourthGroup && (
                  <Table.Cell>{context.fourthGroup}</Table.Cell>
                )}
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      );
    }

    return content;
  }
}

export default VoteContext;
