import React, { Component } from 'react';
import { connect } from 'react-redux';
import Refund from '../../../components/Wallet/Actions/Refund';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

class RefundContainer extends Component<Props> {
  render() {
    const { account, transaction, actions } = this.props;

    return (
      <Refund account={account} transaction={transaction} actions={actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
    transaction: state.transaction
  };
}

export default connect(mapStateToProps, null)(RefundContainer);
