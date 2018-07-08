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
  accounts: {},
  history: {}
};

export default class Home extends Component<Props> {
  props: Props;

  componentDidUpdate() {
    const {
      states,
      accounts,
      history
    } = this.props;
    if (states.deviceConnected && states.nodeConnected &&
      states.accountsRetrieved && accounts.names.length === 1) {
      history.push("/wallet");
    }
  }

  render() {
    const {
        states,
        accounts
    } = this.props;

    console.log(this.props);

    let mainSegment = <Lock />;
    if (states.deviceConnected && !states.nodeConnected) {
      mainSegment = <Connection />;
    }

    if (states.deviceConnected && states.nodeConnected &&
      states.accountsRequested && states.accountsRetrieved &&
      accounts.names.length === 0) {
      mainSegment = <NoAccounts accounts={accounts} />
    }

    if (states.deviceConnected && states.nodeConnected &&
      states.accountsRetrieved && accounts.names.length > 1) {
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
