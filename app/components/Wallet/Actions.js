// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Segment } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionsStake from './Actions/Stake';

type Props = {
};

export default class Actions extends Component<Props> {
    props: Props;
    
    render() {
        const panes = [
            { menuItem: 'History', render: () => <ActionsHistory /> },
            { menuItem: 'Send', render: () => <ActionsSend /> },
            { menuItem: 'Stake\\Unstake', render: () => <ActionsStake /> }
        ]

        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        );
    }
}