// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import History from '../../../components/Wallet/Actions/History';
import { getActions } from '../../../actions/accounts';

type Props = {
  accounts: {},
  actions: {}
};

class HistoryContainer extends Component<Props> {
  props: Props;

  render() {
    const { accounts, actions } = this.props;
    const history = accounts.actions === null ? [] : accounts.actions;
    return (
      <History
        account={accounts.account}
        actions={history}
        getActions={actions.getActions}
        lastIrreversibleBlock={accounts.lastIrreversibleBlock}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getActions
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
