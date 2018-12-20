// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Locker from '../components/Locker';

import * as WalletActions from '../actions/wallet';
import * as StateActions from '../actions/states';

type Props = {
  history: {},
  actions: {},
  states: {},
  wallet: {},
  accounts: {},
  loading: {},
  settings: {}
};

class LockerContainer extends Component<Props> {
  props: Props;

  render() {
    const {
      history,
      wallet,
      actions,
      states,
      accounts,
      loading,
      settings
    } = this.props;
    return (
      <Locker
        history={history}
        wallet={wallet}
        actions={actions}
        states={states}
        accounts={accounts}
        loading={loading}
        settings={settings}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet,
    states: state.states,
    accounts: state.accounts,
    loading: state.loading,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...StateActions,
        ...WalletActions
      },
      dispatch
    )
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LockerContainer)
);
