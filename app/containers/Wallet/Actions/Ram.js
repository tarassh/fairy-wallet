import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ram from '../../../components/Wallet/Actions/Ram';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

class RamContainer extends Component<Props> {
  render() {
    const { account, transaction, actions } = this.props;

    return (
      <Ram
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

export default connect(mapStateToProps, null)(RamContainer);
