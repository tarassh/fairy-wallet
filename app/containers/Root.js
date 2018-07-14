// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import { PersistGate } from 'redux-persist/integration/react'

type Props = {
  store: {},
  persistor: {},
  history: {}
};

export default class Root extends Component<Props> {
    Props: props;
    
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
