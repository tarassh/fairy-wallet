// @flow
import React, { Component } from 'react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionStake from '../../containers/Wallet/Actions/Stake';
import ActionBuyRam from '../../containers/Wallet/Actions/BuyRam';
import ActionSellRam from '../../containers/Wallet/Actions/SellRam';
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
      transferFunds: <ActionsSend />,
      stake: <ActionStake />,
      ram: <ActionBuyRam />,
      voting: <ActionVote />,
    };

    return (
      panes[activeItem]
    );
  }
}
