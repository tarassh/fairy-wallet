// @flow
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';


class Lock extends Component<Props> {

  render() {

    return (
      <Message floating size='mini'>
        <Message.Content>
          <Message.Header>To begin, connect and unlock your Ledger Wallet.</Message.Header>
          Open the Eos app on your device.
        </Message.Content>
      </Message>
    );
  }
}

export default Lock;