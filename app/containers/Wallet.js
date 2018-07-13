// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccount } from '../actions/accounts';
import Wallet from '../components/Wallet';


type Props = {
  actions: {},
  states: {},
  loading: {}
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
    loading: state.loading
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAccount
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);