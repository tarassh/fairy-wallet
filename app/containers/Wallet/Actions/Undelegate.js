import React, { Component } from 'react';
import { connect } from 'react-redux';
import Undelegate from '../../../components/Wallet/Actions/Undelegate';

type Props = {
  account: {},
  transaction: {},
  delegates: {},
  actions: {}
};

class UndelegateContainer extends Component<Props> {
  render() {
    const { account, transaction, delegates, actions } = this.props;

    return (
      <Undelegate
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

export default connect(mapStateToProps, null)(UndelegateContainer);
