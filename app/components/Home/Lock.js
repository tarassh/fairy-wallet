// @flow
import React, { Component } from 'react';
import { Message, Form } from 'semantic-ui-react';


class Lock extends Component<Props> {

  render() {

    return (
      <Form>
        <Message>
          <Message.Content>
            <p>To begin, connect and unlock your Ledger Wallet.</p>
            <p>Open the Eos app on your device.</p>
          </Message.Content>
        </Message>
      </Form>
    );
  }
}

export default Lock;