import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {}
};

class DelegateContext extends Component<Props> {
  render() {
    const { context } = this.props;

    let content = '';
    if (context !== null) {
      content = (
        <Table basic>
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

    return content;
  }
}

export default DelegateContext;
