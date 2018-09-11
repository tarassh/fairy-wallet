import React, { Component } from 'react';
import { connect } from 'react-redux';
import SellRam from '../../../components/Wallet/Actions/SellRam';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

class SystemContainer extends Component<Props> {
  render() {
    const { account, transaction, actions } = this.props;

    return (
      <SellRam
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

export default connect(mapStateToProps, null)(SystemContainer);
