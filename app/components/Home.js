// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './Home.css';
import Lock from './Home/Lock'
import NoAccounts from './Home/NoAccounts'
import Connection from './Home/Connection'
import ListAccounts from './Home/ListAccounts'

type Props = {
  states: {},
  loading: {},
  accounts: {}
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const {
      states,
      loading,
      accounts
    } = this.props;

    console.log(loading);

    let mainSegment = <Lock />;
    if (states.deviceConnected && !states.nodeConnected) {
      mainSegment = <Connection />;
    }
    if (states.deviceConnected && states.nodeConnected && !states.accountsRetrieved) {
      mainSegment = <NoAccounts  accounts={accounts} />
    }
    if (states.deviceConnected && states.nodeConnected && states.accountsRetrieved) {
      mainSegment = <ListAccounts accounts={accounts.names} />;
    }

    return (
      <Grid stretched textAlign='center' verticalAlign='middle'>
        <Grid.Row />
        <Grid.Row columns={3} className='container'>
          <Grid.Column width={5} />
          <Grid.Column width={6}>
            {mainSegment}
          </Grid.Column>
          <Grid.Column width={5} />
        </Grid.Row>
      </Grid>
    );
  }
}
