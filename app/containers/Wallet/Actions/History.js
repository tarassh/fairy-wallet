// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../../components/Wallet/Actions/History';

type Props = {
  accounts: {},
  actions: {},
  explorer: {}
};

class HistoryContainer extends Component<Props> {
  props: Props;

  render() {
    const { accounts, actions, explorer } = this.props;
    const history = accounts.actions === null ? [] : accounts.actions;
    return (
      <History
        account={accounts.account}
        actions={actions}
        history={history}
        explorer={explorer}
        lastIrreversibleBlock={accounts.lastIrreversibleBlock}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    explorer: state.settings.explorers[0]
  };
}

export default connect(mapStateToProps, null)(HistoryContainer);
