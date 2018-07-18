// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Label, Table, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';

import TokenAddModal from './TokenAddModal';
import TokenRemoveModal from './TokenRemoveModal';

type Props = {
  accounts: {}
};

class Balance extends Component<Props> {
  state = { openTokenAddModal: false, openTokenRemoveModal: false, tokenSymbol: '' };

  handleTokenAddOpen = () => this.setState({ openTokenAddModal: true });
  handleTokenAddClose = () => this.setState({ openTokenAddModal: false }); 
  handleTokenRemoveOpen = (e) => this.setState({ openTokenRemoveModal: true, tokenSymbol: e.target.id });
  handleTokenRemoveClose = () => this.setState({ openTokenRemoveModal: false, tokenSymbol: '' }); 

  render() {
    const {
      accounts
    } = this.props;
    const {
      openTokenAddModal, 
      openTokenRemoveModal,
      tokenSymbol
    } = this.state;

    if (accounts.balances !== null) {
      delete accounts.balances.EOS;
    }
    const staked = `${parseFloat(accounts.account.voter_info.staked / 10000).toFixed(4)} EOS`;

    return (
      <Segment.Group className='no-border no-padding'>
        <Segment>
          <Label>
            Account
            <Label.Detail>
              {accounts.account.account_name}
            </Label.Detail>
          </Label>
        </Segment>
        <Segment>
          <Label>
            Balance
            <Label.Detail>
              Staked/Delegated {staked}
            </Label.Detail>
            <Label.Detail>
              Liquid {accounts.account.core_liquid_balance}
            </Label.Detail>
          </Label>
        </Segment>
        <Segment>
          <Button fluid onClick={this.handleTokenAddOpen}>Add new token</Button>
          <TokenAddModal open={openTokenAddModal} handleClose={this.handleTokenAddClose} />
        </Segment>
        <Segment>
          <TokenRemoveModal open={openTokenRemoveModal} handleClose={this.handleTokenRemoveClose} symbol={tokenSymbol} />
          <Table basic='very' compact='very' unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Token
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Balance
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(accounts.balances, (balance, symbol) => (
                <Table.Row key={symbol}>
                  <Table.Cell collapsing>{symbol}</Table.Cell>
                  <Table.Cell collapsing>{balance}</Table.Cell>
                  <Table.Cell collapsing>
                    <Button 
                      icon='close' 
                      basic 
                      id={symbol} 
                      onClick={this.handleTokenRemoveOpen}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  currency: state.currency
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addToken,
    getCurrencyStats
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Balance);