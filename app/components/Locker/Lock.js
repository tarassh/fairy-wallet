// @flow
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Lock extends Component<Props> {
  render() {
    return (
      <Form>
        <p>To begin, connect and unlock your Ledger Wallet.</p>
        <p>Open the Eos app on your device.</p>
      </Form>
    );
  }
}

export default Lock;
