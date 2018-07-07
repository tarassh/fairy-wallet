// @flow
import React, { Component } from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';
import styles from './Wallet.css';
import * as types from '../actions/types';

type Props = {
    history: {},
    actions: {},
    states: {},
    ledger: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  render() {
    const {
        states,
        ledger
    } = this.props;

    return (
        <Grid stretched={true} divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column width={6}>
                    {leftSegment}
                </Grid.Column>
                <Grid.Column width={10}>
                    {rightSegment}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
  }
}