import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetState, sellram } from '../../../actions/transactions';
import { getAccount, getActions } from '../../../actions/accounts';
import SellRam from '../../../components/Wallet/Actions/SellRam';

type Props = {
  account: {},
  transactions: {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {},
  sellram: number => {}
};

class SystemContainer extends Component<Props> {
  render() {
    const { account, transactions } = this.props;

    return (
      <SellRam
        account={account}
        transactions={transactions}
        getAccount={this.props.getAccount}
        getActions={this.props.getActions}
        sellram={this.props.sellram}
        resetState={this.props.resetState}
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
      resetState,
      getAccount,
      getActions,
      sellram
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemContainer);
