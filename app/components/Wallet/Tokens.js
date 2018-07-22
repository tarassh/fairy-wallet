import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import _ from 'lodash';

import TokenRemoveModal from './TokenRemoveModal';
import TokenAddModal from './TokenAddModal';

type Props = {
  accounts: {}
};

class Tokens extends Component<Props> {
  state = {
    openAdd: false,
    openRemove: false,
    symbol: ''
  };

  handleRemoveOpen = e =>
    this.setState({ openRemove: true, symbol: e.target.id });
  handleRemoveClose = () => this.setState({ openRemove: false, symbol: '' });
  handleAddOpen = () => this.setState({ openAdd: true });
  handleAddClose = () => this.setState({ openAdd: false });

  render() {
    const { accounts } = this.props;
    const { openAdd, openRemove, symbol } = this.state;

    return (
      <div>
        <Button fluid onClick={this.handleAddOpen}>
          Add new token
        </Button>
        <TokenAddModal open={openAdd} handleClose={this.handleAddClose} />
        <TokenRemoveModal
          open={openRemove}
          handleClose={this.handleRemoveClose}
          symbol={symbol}
        />
        <Table basic="very" compact="very" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Token</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(accounts.balances, (balance, s) => (
              <Table.Row key={s}>
                <Table.Cell collapsing>{s}</Table.Cell>
                <Table.Cell collapsing>{balance}</Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    icon="close"
                    basic
                    id={s}
                    onClick={this.handleRemoveOpen}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Tokens;
