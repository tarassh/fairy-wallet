// @flow
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionsStake from '../../containers/Wallet/Actions/Stake';

type Props = {
  onTabChange: (SyntheticEvent, object) => {}
};

export default class Actions extends Component<Props> {
  props: Props;

  render() {
    const panes = [
      { key: 'history', menuItem: 'History', render: () => <ActionsHistory />},
      { key: 'send', menuItem: 'Send', render: () => <ActionsSend /> },
      { key: 'stake', menuItem: 'Staking [Delegation]', render: () => <ActionsStake /> }
    ];
    const { onTabChange } = this.props;

    return (
      <Tab
        menu={{ color: 'grey', widths: 3, secondary: false, floated: false }}
        panes={panes}
        onTabChange={onTabChange}
      />
    );
  }
}
