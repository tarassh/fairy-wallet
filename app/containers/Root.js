// @flow
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from '../routes';

import * as LedgerActions from "../actions/ledger";

type Props = {
  actions: {},
  store: {},
  persistor: {},
  history: {}
};

class Root extends Component<Props> {
  Props: props;

  componentWillMount() {
    const { actions } = this.props;
    actions.startListen();
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.stopListen();
  }

  render() {
    const {
      store,
      persistor,
      history
    } = this.props

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...LedgerActions
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Root);
