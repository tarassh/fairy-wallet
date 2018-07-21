// @flow
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionsStake from '../../containers/Wallet/Actions/Stake';

type Props = {};

export default class Actions extends Component<Props> {
  props: Props;

  render() {
    const panes = [
      { menuItem: 'History', render: () => <ActionsHistory /> },
      { menuItem: 'Send', render: () => <ActionsSend /> },
      { menuItem: 'Staking [Delegation]', render: () => <ActionsStake /> }
    ];

    return (
      <Tab
        menu={{ color: 'grey', widths: 3, secondary: false }}
        panes={panes}
      />
    );
  }
}
