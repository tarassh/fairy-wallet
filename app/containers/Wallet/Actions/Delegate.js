import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  delegate,
  undelegate,
  resetState
} from '../../../actions/transactions';
import { getAccount, getActions, setDelegateeAccount } from '../../../actions/accounts';
import Delegate from '../../../components/Wallet/Actions/Delegate';

type Props = {
  account: {},
  transactions: {},
  delegates: {},
  delegate: (string, string, string, string) => {},
  setDelegateeAccount: (string) => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

class DelegateContainer extends Component<Props> {
  render() {
    const { account, transactions, delegates } = this.props;

    return (
      <Delegate
        account={account}
        transactions={transactions}
        delegates={delegates}
        getAccount={this.props.getAccount}
        getActions={this.props.getActions}
        delegate={this.props.delegate}
        resetState={this.props.resetState}
        setDelegateeAccount={this.props.setDelegateeAccount}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
    transactions: state.transactions,
    delegates: state.accounts.delegates
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      delegate,
      undelegate,
      resetState,
      getAccount,
      getActions,
      setDelegateeAccount
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DelegateContainer);
