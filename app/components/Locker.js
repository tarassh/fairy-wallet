// @flow
import React, { Component } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import Lock from './Locker/Lock';
import NoAccounts from './Locker/NoAccounts';
import Connection from './Locker/Connection';
import ListAccounts from './Locker/ListAccounts';
import Inactivity from './Locker/Inactivity';
import styles from './Locker.css'; // eslint-disable-line no-unused-vars

type Props = {
  states: {},
  accounts: {},
  ledger: {},
  loading: {},
  settings: {}
};

export default class Locker extends Component<Props> {
  props: Props;

  render() {
    const { states, accounts, ledger, loading, settings } = this.props;

    let isLoading = false;
    _.forEach(loading, value => {
      if (value === true) {
        isLoading = true;
        return false;
      }
    });

    let mainSegment = <div />;
    if (!states.deviceConnected) {
      mainSegment = <Lock ledger={ledger} settings={settings} />;
    }

    if (states.deviceConnected && accounts.publicKey === null) {
      mainSegment = <Inactivity />;
    }

    if (
      states.deviceConnected &&
      !states.nodeConnected &&
      accounts.publicKey !== null
    ) {
      mainSegment = <Connection />;
    }

    if (
      states.deviceConnected &&
      states.nodeConnected &&
      accounts.publicKey !== null &&
      !states.accountsRetrieved
    ) {
      mainSegment = <Connection />;
    }

    const noAccount =
      states.deviceConnected &&
      states.nodeConnected &&
      states.accountsRequested &&
      states.accountsRetrieved &&
      accounts.names.length === 0;

    if (noAccount) {
      mainSegment = <NoAccounts accounts={accounts} />;
    }

    if (
      states.deviceConnected &&
      states.nodeConnected &&
      states.accountsRetrieved &&
      accounts.names.length > 0
    ) {
      mainSegment = <ListAccounts accounts={accounts.names} />;
    }

    const darkMode = settings.selectedTheme === 'dark';

    return (
      <Segment className="no-border no-padding no-background">
        <Dimmer
          active={isLoading}
          inverted={!darkMode}
          className="solid-background"
        >
          <Loader />
        </Dimmer>

        {noAccount ? (
          <div className="no-account-container">{mainSegment}</div>
        ) : (
          <Grid
            stretched
            textAlign="center"
            verticalAlign={noAccount ? 'left' : 'middle'}
            className="locker"
          >
            <Grid.Row />
            <Grid.Row columns={3}>
              <Grid.Column width={4} />
              <Grid.Column width={8}>{mainSegment}</Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>
            <Grid.Row />
          </Grid>
        )}
      </Segment>
    );
  }
}
