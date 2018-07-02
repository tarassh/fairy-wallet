// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';


class Lock extends Component<Props> {
    render() {
        return (
          <Container>
            <h2>To begin, connect and unlock your Ledger Wallet.</h2>
            <h3>Then, open the Eos app on your device.</h3>
          </Container>
        );
    }
}

export default Lock;