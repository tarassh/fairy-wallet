// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import styles from './Wallet.css';
import WalletBalance from './Wallet/Balance';
import WalletActions from './Wallet/Actions';

type Props = {
  states: {},
  accounts: {},
  history: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  componentDidUpdate() {
    const { states, history } = this.props;
    if (!states.deviceConnected) {
      history.goBack();
    }
  }

  render() {
    const {
      accounts
    } = this.props;

    const leftSegment = <WalletBalance accounts={accounts} />
    const rightSegment = <WalletActions />

    return (
      <Segment.Group horizontal className='wallet'>
        <Segment className='balance'>{leftSegment}</Segment>
        <Segment className='actions'>{rightSegment}</Segment>
      </Segment.Group>
    );
  }
}