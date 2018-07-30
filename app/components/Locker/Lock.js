// @flow
import React, { Component } from 'react';
import { Form, Image } from 'semantic-ui-react';
import plugDevice from '../../../resources/images/plug-device.svg';
import launchApp from '../../../resources/images/launch-app.svg';

class Lock extends Component<Props> {
  render() {
    const { ledger } = this.props;

    let text = 'To begin, connect and unlock your Ledger Wallet.';
    let src = plugDevice;

    if (ledger.devicePath !== null) {
      text = 'Open EOS application on your device.';
      src = launchApp;
    }

    return (
      <Form>
        <Image centered src={src} />
        <p>{text}</p>
      </Form>
    );
  }
}

export default Lock;
