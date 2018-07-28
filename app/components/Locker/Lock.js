// @flow
import React, { Component } from 'react';
import { Form, Image } from 'semantic-ui-react';

class Lock extends Component<Props> {
  render() {
    const { ledger } = this.props;

    let text = 'To begin, connect and unlock your Ledger Wallet.';
    let src = '../resources/images/plug-device.svg';

    if (ledger.devicePath !== null) {
      text = 'Open EOS application on your device.';
      src = '../resources/images/launch-app.svg';
    }

    return (
      <Form>
        <p>{text}</p>
        <Image
          centered
          src={src}
          style={{
            paddingTop: '2em'
          }}
        />
      </Form>
    );
  }
}

export default Lock;
