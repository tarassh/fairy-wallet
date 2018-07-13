// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccount } from '../actions/accounts';
import Wallet from '../components/Wallet';
import { signTransaction } from '../actions/ledger';


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

    actions.getAccount(accounts.names ? accounts.names[0] : 'cryptofairy1');
  }

  componentDidUpdate() {
    const { 
      transaction,
      actions,
      loading
    } = this.props;

    console.log(transaction);
    if (transaction.tx != null && transaction.tx.transaction.signatures.length === 0 && (loading.SIGN_TRANSACTION === undefined)) {
      actions.signTransaction(transaction.raw);      
    }
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
      signTransaction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);