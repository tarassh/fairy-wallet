import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
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
    symbol: '',
    contract: ''
  };

  handleRemoveOpen = (e, { symbol, contract }) =>
    this.setState({ openRemove: true, symbol, contract });
  handleRemoveClose = () =>
    this.setState({ openRemove: false, symbol: '', contract: '' });
  handleAddOpen = () => this.setState({ openAdd: true });
  handleAddClose = () => this.setState({ openAdd: false });

  render() {
    const { accounts } = this.props;
    const { openAdd, openRemove, symbol, contract } = this.state;

    return (
      <div>
        <Button fluid onClick={this.handleAddOpen}>
          Add Token
        </Button>
        <TokenAddModal open={openAdd} handleClose={this.handleAddClose} />
        <TokenRemoveModal
          open={openRemove}
          handleClose={this.handleRemoveClose}
          symbol={symbol}
          contract={contract}
        />
        <Table basic="very" compact="very" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell
                className="token-header"
                style={{ color: 'grey' }}
              >
                Token
              </Table.HeaderCell>
              <Table.HeaderCell
                className="token-header"
                style={{ color: 'grey' }}
              >
                Balance
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(accounts.balances, balance => (
              <Table.Row key={balance.symbol}>
                <Table.Cell collapsing textAlign="center" width={1}>
                  <Button
                    className="no-border"
                    basic
                    symbol={balance.symbol}
                    contract={balance.contract}
                    onClick={this.handleRemoveOpen}
                  >
                    <Icon name="close" className="opacue-2" />
                  </Button>
                </Table.Cell>
                <Table.Cell collapsing style={{ color: 'rgba(0,0,0,.6)' }}>
                  {balance.symbol}
                </Table.Cell>
                <Table.Cell collapsing style={{ color: 'rgba(0,0,0,.6)' }}>
                  {balance.amount}
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
