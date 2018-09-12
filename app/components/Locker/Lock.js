// @flow
import React, { Component } from 'react';
import { Form, Image } from 'semantic-ui-react';
import plugDevice from '../../../resources/images/plug-device.svg';
import launchApp from '../../../resources/images/launch-app.svg';
import plugDeviceDark from '../../../resources/images/plug-device-dark.svg';
import launchAppDark from '../../../resources/images/launch-app-dark.svg';

class Lock extends Component<Props> {
  render() {
    const { ledger, settings } = this.props;
    const dark = settings.selectedTheme === 'dark';

    let text = 'To begin, connect and unlock your Ledger Wallet.';
    let src = dark ? plugDeviceDark : plugDevice;

    if (ledger.devicePath !== null) {
      text = 'Open EOS application on your device.';
      src = dark ? launchAppDark : launchApp;
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
