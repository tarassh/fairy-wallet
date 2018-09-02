// @flow
import React, { Component } from 'react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionDelegate from '../../containers/Wallet/Actions/Delegate';
import ActionUndelegate from '../../containers/Wallet/Actions/Undelegate';
import ActionRam from '../../containers/Wallet/Actions/Ram';
import ActionVote from '../../containers/Wallet/Actions/Vote';

type Props = {
  activeItem: string
};

export default class Actions extends Component<Props> {
  props: Props;

  render() {
    const { activeItem } = this.props;

    const panes = {
      history: <ActionsHistory />,
      transfer: <ActionsSend />,
      delegate: <ActionDelegate />,
      undelegate: <ActionUndelegate />,
      ram: <ActionRam />,
      voting: <ActionVote />
    };

    return (
        panes[activeItem]
    );
  }
}
