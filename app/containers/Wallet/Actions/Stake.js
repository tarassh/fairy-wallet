import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  delegate,
  undelegate,
  resetState,
  delegateUndelegate
} from '../../../actions/transactions';
import { getAccount, getActions, setDelegateeAccount } from '../../../actions/accounts';
import Stake from '../../../components/Wallet/Actions/Stake';

type Props = {
  account: {},
  transactions: {},
  delegates: {},
  delegate: (string, string, string, string) => {},
  undelegate: (string, string, string, string) => {},
  delegateUndelegate: (string, string, string, string) => {},
  setDelegateeAccount: (string) => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

class StakeContainer extends Component<Props> {
  render() {
    const { account, transactions, delegates } = this.props;

    return (
      <Stake
        account={account}
        transactions={transactions}
        delegates={delegates}
        getAccount={this.props.getAccount}
        getActions={this.props.getActions}
        delegate={this.props.delegate}
        undelegate={this.props.undelegate}
        resetState={this.props.resetState}
        delegateUndelegate={this.props.delegateUndelegate}
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
      delegateUndelegate,
      setDelegateeAccount
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeContainer);
