import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transfer from '../../../components/Wallet/Actions/Transfer';

type Props = {
  account: {},
  transaction: {},
  actions: {},
  balances: {},
  currency: {},
  settings: {}
};

class TransferContainer extends Component<Props> {
  render() {
    const { account, transaction, actions, balances, currency, settings } = this.props;

    return (
      <Transfer
        account={account}
        balances={balances}
        currency={currency}
        settings={settings}
        transaction={transaction}
        actions={actions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
    balances: state.accounts.balances,
    transaction: state.transaction,
    currency: state.currency,
    settings: state.settings
  };
}

export default connect(mapStateToProps, null)(TransferContainer);
