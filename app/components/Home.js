// @flow
import React, { Component } from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';
import styles from './Home.css';
import Status from './Home/Status'
import Lock from './Home/Lock'
import NoAccount from './Home/NoAccount'
import Connection from './Home/Connection'
import ListAccounts from './Home/ListAccounts'
import * as types from '../actions/types';

type Props = {
    history: {},
    actions: {},
    states: {},
    ledger: {}
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const {
        states,
        ledger,
        accounts
    } = this.props;

//    let statusSegment = <Status 
//        deviceConnected={states.deviceConnected} 
//        accountsFound={states.nodeConnected} 
//        nodeConnected={states.accountsRetrieved} />

    var mainSegment = <Lock />;
    if(states.deviceConnected && !states.nodeConnected){
        mainSegment = <Connection />;
    }
    if(states.deviceConnected && states.nodeConnected && !states.accountsRetrieved){
        mainSegment = <NoAccount />
    }
    if(states.deviceConnected && states.nodeConnected && states.accountsRetrieved){
        mainSegment = <ListAccounts accounts={accounts.names}/>;
    }

    return (
        <Grid stretched={true} textAlign='center' verticalAlign='middle'>
            <Grid.Row />
            <Grid.Row columns={3} className='container'>
                <Grid.Column width={5}/>
                <Grid.Column width={6}>
                    {mainSegment}
                </Grid.Column>
                <Grid.Column width={5}/>
            </Grid.Row>
        </Grid>
    );
  }
}
