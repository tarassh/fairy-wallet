// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccount, getActions } from '../actions/accounts';
import Wallet from '../components/Wallet';
import { signTransaction } from '../actions/ledger';
import { clearConnection } from '../actions/connection';

type Props = {
  actions: {},
  states: {},
  loading: {},
  accounts: {},
  history: {},
  currency: {},
  failure: {}
};

class WalletContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const { actions, accounts } = this.props;
    actions.getAccount(accounts.names[accounts.activeAccount]);
  }

  changeNode() {
    const { actions } = this.props;
    actions.push('/');
  }

  render() {
    const { states, accounts, loading, history, currency, failure, actions } = this.props;

    return (
      <Wallet
        accounts={accounts}
        states={states}
        loading={loading}
        history={history}
        currency={currency}
        failure={failure}
        getAccount={actions.getAccount}
        clearConnection={actions.clearConnection}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    states: state.states,
    accounts: state.accounts,
    loading: state.loading,
    transactions: state.transactions,
    currency: state.currency,
    failure: state.failure
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getAccount,
        getActions,
        signTransaction,
        clearConnection
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);
