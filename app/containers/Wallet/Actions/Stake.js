import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  delegate,
  undelegate,
  resetState,
  delegateUndelegate
} from '../../../actions/transactions';
import { getAccount, getActions } from '../../../actions/accounts';
import Stake from '../../../components/Wallet/Actions/Stake';

type Props = {
  account: {},
  transactions: {},
  delegate: (string, string, string, string) => {},
  undelegate: (string, string, string, string) => {},
  delegateUndelegate: (string, string, string, string) => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

class StakeContainer extends Component<Props> {
  render() {
    const { account, transactions } = this.props;

    return (
      <Stake
        account={account}
        transactions={transactions}
        getAccount={this.props.getAccount}
        getActions={this.props.getActions}
        delegate={this.props.delegate}
        undelegate={this.props.undelegate}
        resetState={this.props.resetState}
        delegateUndelegate={this.props.delegateUndelegate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
    transactions: state.transactions
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
      delegateUndelegate
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeContainer);
