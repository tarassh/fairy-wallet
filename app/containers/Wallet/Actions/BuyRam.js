import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetState, buyram, buyrambytes } from '../../../actions/transactions';
import { getAccount, getActions } from '../../../actions/accounts';
import BuyRam from '../../../components/Wallet/Actions/BuyRam';

type Props = {
  account: {},
  transactions: {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {},
  buyram: string => {},
  buyrambytes: number => {}
};

class BuyRamContainer extends Component<Props> {
  render() {
    const { account, transactions } = this.props;

    return (
      <BuyRam
        account={account}
        transactions={transactions}
        getAccount={this.props.getAccount}
        getActions={this.props.getActions}
        buyram={this.props.buyram}
        buyrambytes={this.props.buyrambytes}
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
      buyram,
      buyrambytes
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyRamContainer);
