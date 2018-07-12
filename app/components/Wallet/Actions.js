// @flow
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';

type Props = {
};

export default class Actions extends Component<Props> {
  props: Props;

  render() {
    const panes = [
      { menuItem: 'History', render: () => <ActionsHistory /> },
      { menuItem: 'Send', render: () => <ActionsSend /> }
    ]

    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    );
  }
}