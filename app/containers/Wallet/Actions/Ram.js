import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  resetState,
  buyram,
  buyrambytes,
  sellram
} from '../../../actions/transactions';
import { getAccount, getActions } from '../../../actions/accounts';
import Ram from '../../../components/Wallet/Actions/Ram';

type Props = {
  account: {},
  transactions: {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {},
  buyram: string => {},
  buyrambytes: number => {},
  sellram: number => {}
};

class RamContainer extends Component<Props> {
  render() {
    const { account, transactions } = this.props;

    return (
      <Ram
        account={account}
        transactions={transactions}
        actions={{
          getAccount: this.props.getAccount,
          getActions: this.props.getActions,
          buyram: this.props.buyram,
          buyrambytes: this.props.buyrambytes,
          sellram: this.props.sellram,
          resetState: this.props.resetState
        }}
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
      buyrambytes,
      sellram
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RamContainer);
