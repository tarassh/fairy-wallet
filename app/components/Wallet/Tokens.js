import React, { Component } from 'react';
import { Button, Icon, Grid, List } from 'semantic-ui-react';
import _ from 'lodash';

import TokenRemoveModal from './TokenRemoveModal';
import TokenAddModal from './TokenAddModal';
import MainContentContainer from './../Shared/UI/MainContent';
import ScrollingTable from './../Shared/UI/ScrollingTable';

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
      <MainContentContainer 
        title="Airdrops" 
        subtitle="Watch your Airdrops here"
        content={
          <ScrollingTable 
            header={
              renderHeader()
            }
            content={
              <span>
                <TokenAddModal open={openAdd} handleClose={this.handleAddClose} />
                <TokenRemoveModal
                  open={openRemove}
                  handleClose={this.handleRemoveClose}
                  symbol={symbol}
                  contract={contract}
                />
                <List divided style={{ marginBottom: '2em' }} selection>
                  {_.map(accounts.balances, balance => (
                    <List.Item key={`${balance.symbol}-${balance.contract}`}>
                      <List.Content>
                        {renderTokenBalance(balance, this.handleRemoveOpen)}
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
                <Button onClick={this.handleAddOpen} circular icon="plus" />
              </span>
            }
          />}
      />
    );
  }
}

function renderHeader() {
  return (
    <Grid className="tableheader">
      <Grid.Row>
        <Grid.Column widht={3} />
        <Grid.Column width={5}>
          <p className="tableheadertitle">token</p>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
          <p className="tableheadertitle">balance</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function renderTokenBalance(balance, handler) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column
          widht={3}
          onClick={() => handler(this, balance)}
          style={{ cursor: 'pointer' }}
        >
          <Icon name="close" />
        </Grid.Column>
        <Grid.Column width={5}>{balance.symbol}</Grid.Column>
        <Grid.Column width={8} textAlign="right">
          {balance.amount}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Tokens;
