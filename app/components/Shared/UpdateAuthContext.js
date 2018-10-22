import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

type Props = {
  context: {}
};

class UpdateAuthContext extends Component<Props> {
  renderText = () => {
    const { context } = this.props;
    return (
      <p className="dashed-border">
        You are about to update account <strong>{context.permission}</strong> permission with <strong>{context.auth.keys[0].key}</strong> key. Transaction details are listed
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
            <Table.Cell>Account</Table.Cell>
            <Table.Cell>Permission</Table.Cell>
            <Table.Cell>Parent</Table.Cell>
            <Table.Cell>Threshold</Table.Cell>
            <Table.Cell>Key</Table.Cell>
            <Table.Cell>Weight</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{context.contract}</Table.Cell>
            <Table.Cell>{context.action}</Table.Cell>
            <Table.Cell>{context.account}</Table.Cell>
            <Table.Cell>{context.permission}</Table.Cell>
            <Table.Cell>{context.parent}</Table.Cell>
            <Table.Cell>{context.auth.threshold}</Table.Cell>
            <Table.Cell>{context.auth.keys[0].key}</Table.Cell>
            <Table.Cell>{context.auth.keys[0].weight}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }

  render() {
    const { context } = this.props;

    let content;
    if (context !== null) {
      content = (
        <div>
          {this.renderText()}
          {this.renderDetails()}
        </div>
      );
    }

    return content;
  }
}

export default UpdateAuthContext;
