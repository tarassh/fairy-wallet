// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Segment } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from './Actions/Send';
import ActionsReceive from './Actions/Receive';

type Props = {
};

export default class Actions extends Component<Props> {
    props: Props;
    
    render() {
        const panes = [
            { menuItem: 'History', render: () => <ActionsHistory /> },
            { menuItem: 'Send', render: () => <ActionsSend /> },
            { menuItem: 'Receive', render: () => <ActionsReceive /> },
        ]

        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        );
    }
}