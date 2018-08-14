// @flow
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionStake from '../../containers/Wallet/Actions/Stake';
import ActionBuyRam from '../../containers/Wallet/Actions/BuyRam';
import ActionSellRam from '../../containers/Wallet/Actions/SellRam';
import ActionVote from '../../containers/Wallet/Actions/Vote';

type Props = {
  onTabChange: (SyntheticEvent, object) => {}
};

export default class Actions extends Component<Props> {
  props: Props;

  render() {
    const panes = [
      {
        key: 'history',
        menuItem: 'History',
        render: () => (
          <Tab.Pane>
            <ActionsHistory />
          </Tab.Pane>
        )
      },
      {
        key: 'send',
        menuItem: 'Send',
        render: () => (
          <Tab.Pane>
            <ActionsSend />
          </Tab.Pane>
        )
      },
      {
        key: 'stake',
        menuItem: 'Stake',
        render: () => (
          <Tab.Pane>
            <ActionStake />
          </Tab.Pane>
        )
      },
      {
        key: 'buyram',
        menuItem: 'Buy RAM',
        render: () => (
          <Tab.Pane>
            <ActionBuyRam />
          </Tab.Pane>
        )
      },
      {
        key: 'sellram',
        menuItem: 'Sell RAM',
        render: () => (
          <Tab.Pane>
            <ActionSellRam />
          </Tab.Pane>
        )
      },
      {
        key: 'vote',
        menuItem: 'Vote',
        render: () => (
          <Tab.Pane>
            <ActionVote />
          </Tab.Pane>
        )
      }
    ];
    const { onTabChange } = this.props;

    return (
      <Tab
        menu={{ vertical: true, tabular: true, fluid: true }}
        panes={panes}
        onTabChange={onTabChange}
      />
    );
  }
}
