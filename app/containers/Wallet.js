// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccount, getActions } from '../actions/accounts';
import Wallet from '../components/Wallet';
import { signTransaction } from '../actions/ledger';

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
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const { actions, accounts } = this.props;
    actions.getAccount(accounts.names[accounts.activeAccount]);
    actions.getActions(accounts.names[accounts.activeAccount]);
  }

  render() {
    const { states, accounts, loading, history } = this.props;

    return (
      <Wallet
        accounts={accounts}
        states={states}
        loading={loading}
        history={history}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    states: state.states,
    accounts: state.accounts,
    loading: state.loading,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getAccount,
        getActions,
        signTransaction
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletContainer);
