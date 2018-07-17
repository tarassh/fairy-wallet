// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Label, Table, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';

import TokenModal from './TokenModal';

type Props = {
  accounts: {},
  loading: {}
};

class Balance extends Component<Props> {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false }); 


  render() {
    const {
      accounts,
      loading
    } = this.props;
    const {
      open
    } = this.state;

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
          <Button fluid onClick={this.handleOpen}>Add new token</Button>
          <TokenModal open={open} handleClose={this.handleClose} />
        </Segment>
        <Segment>
          <Table celled basic='very' compact='very' unstackable>
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
              {_.map(accounts.balances, (balance, currency) => (
                <Table.Row key={currency}>
                  <Table.Cell collapsing>{currency}</Table.Cell>
                  <Table.Cell collapsing>{balance}</Table.Cell>
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