// @flow
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionsSystem from '../../containers/Wallet/Actions/System';
import ActionVote from '../../containers/Wallet/Actions/Vote';

type Props = {
  onTabChange: (SyntheticEvent, object) => {}
};

export default class Actions extends Component<Props> {
  props: Props;

  render() {
    const panes = [
      { key: 'history', menuItem: 'History', render: () => <ActionsHistory /> },
      { key: 'send', menuItem: 'Send', render: () => <ActionsSend /> },
      { key: 'system', menuItem: 'System', render: () => <ActionsSystem onTabChange={this.props.onTabChange} /> },
      { key: 'vote', menuItem: 'Vote', render: () => <ActionVote /> }
    ];
    const { onTabChange } = this.props;

    return (
      <Tab
        menu={{ color: 'grey', widths: 4, secondary: false, floated: false }}
        panes={panes}
        onTabChange={onTabChange}
      />
    );
  }
}
