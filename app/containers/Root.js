// @flow
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from '../routes';

import * as WalletActions from "../actions/wallet";

type Props = {
  actions: {},
  store: {},
  persistor: {},
  history: {},
  settings: {}
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
      history,
      settings
    } = this.props

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Routes settings={settings} />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
