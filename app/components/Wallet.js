// @flow
import React, { Component } from 'react';
import { Message, Icon, Segment } from 'semantic-ui-react';
import styles from './Wallet.css';
import WalletBalance from './Wallet/Balance';
import WalletActions from './Wallet/Actions';

type Props = {
  states: {},
  accounts: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  render() {
    const {
      states,
      accounts
    } = this.props;

    let leftSegment = (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Retrieving account info</Message.Header>
        </Message.Content>
      </Message>
    );

    let rightSegment = (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Retrieving history</Message.Header>
        </Message.Content>
      </Message>
    );

    if (states.accountInfoRetrieved) {
      leftSegment = <WalletBalance accounts={accounts} />
      rightSegment = <WalletActions />
    }

    return (
      <Segment.Group horizontal className='wallet'>
        <Segment className='balance'>{leftSegment}</Segment>
        <Segment className='actions'>{rightSegment}</Segment>
      </Segment.Group>
    );
  }
}