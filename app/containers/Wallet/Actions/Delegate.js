import React, { Component } from 'react';
import { connect } from 'react-redux';
import Delegate from '../../../components/Wallet/Actions/Delegate';

type Props = {
  account: {},
  transaction: {},
  delegates: {},
  actions: {}
};

class DelegateContainer extends Component<Props> {
  render() {
    const { account, transaction, delegates, actions } = this.props;

    return (
      <Delegate
        account={account}
        transaction={transaction}
        delegates={delegates}
        actions={actions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
    transaction: state.transaction,
    delegates: state.accounts.delegates
  };
}

export default connect(mapStateToProps, null)(DelegateContainer);
