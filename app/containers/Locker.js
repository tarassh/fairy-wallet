// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Locker from '../components/Locker';

import * as LedgerActions from '../actions/ledger';
import * as StateActions from '../actions/states';

type Props = {
  history: {},
  actions: {},
  states: {},
  ledger: {},
  accounts: {},
  loading: {}
};

class HomeContainer extends Component<Props> {
  props: Props;

  render() {
    const { history, ledger, actions, states, accounts, loading } = this.props;
    return (
      <Locker
        history={history}
        ledger={ledger}
        actions={actions}
        states={states}
        accounts={accounts}
        loading={loading}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    ledger: state.ledger,
    states: state.states,
    accounts: state.accounts,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...StateActions,
        ...LedgerActions
      },
      dispatch
    )
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
);
