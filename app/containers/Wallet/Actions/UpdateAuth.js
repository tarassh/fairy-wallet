import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateAuth from '../../../components/Wallet/Actions/UpdateAuth';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

class UpdateAuthContainer extends Component<Props> {
  render() {
    const { account, transaction, actions } = this.props;

    return (
      <UpdateAuth
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

export default connect(mapStateToProps, null)(UpdateAuthContainer);
