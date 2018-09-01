import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  undelegate,
  resetState,
} from '../../../actions/transactions';
import { getAccount, getActions, setDelegateeAccount } from '../../../actions/accounts';
import Undelegate from '../../../components/Wallet/Actions/Undelegate';

type Props = {
  account: {},
  transactions: {},
  delegates: {},
  undelegate: (string, string, string, string) => {},
  setDelegateeAccount: (string) => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

class UndelegateContainer extends Component<Props> {
  render() {
    const { account, transactions, delegates } = this.props;

    return (
      <Undelegate
        account={account}
        transactions={transactions}
        delegates={delegates}
        getAccount={this.props.getAccount}
        getActions={this.props.getActions}
        undelegate={this.props.undelegate}
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
      undelegate,
      resetState,
      getAccount,
      getActions,
      setDelegateeAccount
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UndelegateContainer);
