// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccount } from '../actions/accounts';
import Wallet from '../components/Wallet';
import { signTransaction } from '../actions/ledger';
import { broadcastTransaction } from '../actions/transaction';


type Props = {
  actions: {},
  states: {},
  loading: {},
  accounts: {},
  history: {}
};

class WalletContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const {
      actions,
      accounts
    } = this.props;

    actions.getAccount(accounts.names[accounts.activeAccount]);
  }

  render() {
    const {
      states,
      accounts,
      loading,
      history
    } = this.props;

    return (
      <Wallet 
        accounts={accounts} 
        states={states} 
        loading={loading} 
        history={history}
      />
    );
  }
};

function mapStateToProps(state) {
  return {
    states: state.states,
    accounts: state.accounts,
    loading: state.loading,
    transaction: state.transaction
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAccount,
      signTransaction,
      broadcastTransaction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);