import React, { Component } from 'react';
import { connect } from 'react-redux';
import BuyRam from '../../../components/Wallet/Actions/BuyRam';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

class BuyRamContainer extends Component<Props> {
  render() {
    const { account, transaction, actions } = this.props;

    return (
      <BuyRam
        account={account}
        transaction={transaction}
        actions={actions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
    transaction: state.transaction
  };
}

export default connect(mapStateToProps, null)(BuyRamContainer);
