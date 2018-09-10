import React, { Component } from 'react';
import { Icon, Grid, List, Image } from 'semantic-ui-react';
import _ from 'lodash';

import TokenRemoveModal from './TokenRemoveModal';
import TokenAddModal from './TokenAddModal';
import MainContentContainer from './../Shared/UI/MainContent';
import ScrollingTable from './../Shared/UI/ScrollingTable';
import { tokenList } from '../Shared/TokenList';

type Props = {
  accounts: {},
  actions: {}
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
    const { accounts, actions } = this.props;
    const { openAdd, openRemove, symbol, contract } = this.state;

    return (
      <MainContentContainer
        title="Airdrops"
        subtitle="Watch your Airdrops here"
        content={
          <ScrollingTable
            header={renderHeader(this.handleAddOpen)}
            content={
              <span>
                <TokenAddModal
                  open={openAdd}
                  handleClose={this.handleAddClose}
                  actions={actions}
                />
                <TokenRemoveModal
                  open={openRemove}
                  handleClose={this.handleRemoveClose}
                  symbol={symbol}
                  contract={contract}
                  actions={actions}
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
              </span>
            }
          />
        }
      />
    );
  }
}

function renderHeader(handler) {
  return (
    <Grid className="tableheader">
      <Grid.Row textAlign="center">
        <Grid.Column width={16}>
          <p className="tableheadertitle">
            tokens{' '}
            {
              <Icon
                name="add circle"
                onClick={() => handler()}
                style={{ cursor: 'pointer' }}
                className="airdrop-token-add"
              />
            }
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function renderTokenBalance(balance, handler) {
  const token = _.find(tokenList, el => balance.symbol === el.symbol);
  const logo = token
    ? token.logo
    : 'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/logos/placeholder.png';
  return (
    <Grid>
      <Grid.Column verticalAlign="middle" width={4}>
        <Image src={logo} />
      </Grid.Column>
      <Grid.Column width={8}>
        <Grid.Row className="airdrop-token">{balance.symbol}</Grid.Row>
        <Grid.Row className="airdrop-token">{balance.amount}</Grid.Row>
      </Grid.Column>
      <Grid.Column
        width={2}
        verticalAlign="middle"
        onClick={() => handler(this, balance)}
        style={{ cursor: 'pointer' }}
        className="airdrop-token-remove"
      >
        <Icon name="times circle outline" />
      </Grid.Column>
    </Grid>
  );
}

export default Tokens;
