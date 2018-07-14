// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccount } from '../actions/accounts';
import Wallet from '../components/Wallet';
import { signTransaction } from '../actions/ledger';
import { broadcastTransaction } from '../actions/transaction';
import { setupNativeToken } from '../actions/settings';


type Props = {
  actions: {},
  states: {},
  loading: {},
  transaction: {}
};

class WalletContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const {
      actions,
      accounts
    } = this.props;

    actions.getAccount(accounts.names[accounts.activeAccount]);
    actions.setupNativeToken();
  }

  componentDidUpdate() {
//    const { 
//      transaction,
//      actions,
//      loading
//    } = this.props;
//
//    console.log(transaction);
//    if (transaction.tx != null && transaction.tx.transaction.signatures.length === 0 && (loading.SIGN_TRANSACTION === undefined)) {
//      actions.signTransaction(transaction.raw);      
//    }
//    if (transaction.tx != null && transaction.tx.transaction.signatures.length > 0 && loading.BROADCAST_TRANSACTION === undefined) {
//      actions.broadcastTransaction(transaction.tx);
//    }
  }

  render() {
    const {
      states,
      accounts,
      loading
    } = this.props;

    return (
      <Wallet accounts={accounts} states={states} loading={loading} />
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
      broadcastTransaction,
      setupNativeToken
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);