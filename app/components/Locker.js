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
  loading: {}
};

export default class Locker extends Component<Props> {
  props: Props;

  render() {
    const { states, accounts, ledger, loading } = this.props;

    let isLoading = false;
    _.forEach(loading, value => {
      if (value === true) {
        isLoading = true;
        return false;
      }
    });

    let mainSegment = <Lock ledger={ledger} />;
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
      states.accountsRequested &&
      states.accountsRetrieved &&
      accounts.names.length === 0
    ) {
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

    return (
      <Segment className="no-border no-padding no-background">
        <Dimmer active={isLoading} inverted className="solid-background">
          <Loader />
        </Dimmer>

        <Grid
          stretched
          textAlign="center"
          verticalAlign="middle"
          className="locker"
        >
          <Grid.Row />
          <Grid.Row columns={3} className="container">
            <Grid.Column width={4} />
            <Grid.Column width={8}>{mainSegment}</Grid.Column>
            <Grid.Column width={4} />
          </Grid.Row>
          <Grid.Row />
        </Grid>
      </Segment>
    );
  }
}
