// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Icon, Step } from 'semantic-ui-react';

type Props = {
    deviceConnected: boolean,
    accountsFound: boolean,
    nodeConnected: boolean
}

class NoAccount extends Component<Props> {
    props: Props;
    
    render() {
        const {
            deviceConnected,
            accountsFound,
            nodeConnected
        } = this.props;
    
        return (
            <Step.Group vertical>
                <Step completed={!deviceConnected}>
                    <Icon name='disk' />
                    <Step.Content>
                        <Step.Title>Connection to Ledger</Step.Title>
                    </Step.Content>
                </Step>

                <Step completed={nodeConnected}>
                    <Icon name='server' />
                    <Step.Content>
                        <Step.Title>Connection to Node</Step.Title>
                    </Step.Content>
                </Step>

                <Step completed={accountsFound}>
                    <Icon name='address card' />
                    <Step.Content>
                    <Step.Title>Get accounts</Step.Title>
                    </Step.Content>
                </Step>
            
                <Step disabled>
                    <Icon name='arrow circle right' />
                    <Step.Content>
                    <Step.Title>Go to wallet</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        );
    }
}

export default NoAccount;