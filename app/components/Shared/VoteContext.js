import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {}
};

class VoteContext extends Component<Props> {
  render() {
    const { context } = this.props;
    const text = context.producers.length > 0? (
      <p>
        You are about to vote for <strong>{context.producers.length}</strong> block producers. Transaction details are listed below.
      </p>
    ) : (
      <p>
        You are about to discard your vote. Transaction details are listed below.
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
                <Table.Cell>Account</Table.Cell>
                <Table.Cell>Producers</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{context.contract}</Table.Cell>
                <Table.Cell>{context.action}</Table.Cell>
                <Table.Cell>{context.account}</Table.Cell>
                <Table.Cell>{context.producers}</Table.Cell>
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
