// @flow
import React, { Component } from 'react';
import { Message, Transition } from 'semantic-ui-react';


class Lock extends Component<Props> {
  state = { animation: 'pulse', duration: 500, visible: true }

  render() {
    const { animation, duration, visible } = this.state

    return (
      <Transition animation={animation} duration={duration} visible={visible}>
        <Message icon floating size='mini'>
          <Message.Content>
            <Message.Header>To begin, connect and unlock your Ledger Wallet.</Message.Header>
            Then, open the Eos app on your device.
          </Message.Content>
        </Message>
      </Transition>
    );
  }
}

export default Lock;