import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import SystemStake from './System/Stake';
import SystemBuyRam from './System/BuyRam';
import SystemSellRam from './System/SellRam';

type Props = {
  account: {},
  transactions: {},
  onTabChange: (SyntheticEvent, object) => {},
  delegate: (string, string, string, string) => {},
  undelegate: (string, string, string, string) => {},
  delegateUndelegate: (boolean, string, string, string, string) => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {},
  buyram: () => {},
  buyrambytes: () => {},
  sellram: () => {}
};

export default class System extends Component<Props> {
  render() {
    const { onTabChange, transactions, account } = this.props;

    const panes = [
      {
        key: 'stake',
        menuItem: 'Stake',
        render: () => (
          <SystemStake
            account={account}
            transactions={transactions}
            getAccount={this.props.getAccount}
            getActions={this.props.getActions}
            delegate={this.props.delegate}
            undelegate={this.props.undelegate}
            delegateUndelegate={this.props.delegateUndelegate}
            resetState={this.props.resetState}
          />
        )
      },
      {
        key: 'buyram',
        menuItem: 'Buy Ram',
        render: () => (
          <SystemBuyRam
            transactions={this.props.transactions}
            account={account}
            buyram={this.props.buyram}
            buyrambytes={this.props.buyrambytes}
            resetState={this.props.resetState}
            getAccount={this.props.getAccount}
            getActions={this.props.getActions}
          />
        )
      },
      {
        key: 'sellram',
        menuItem: 'Sell Ram',
        render: () => (
          <SystemSellRam
            transactions={this.props.transactions}
            account={account}
            sellram={this.props.sellram}
            resetState={this.props.resetState}
            getAccount={this.props.getAccount}
            getActions={this.props.getActions}
          />
        )
      }
    ];

    return (
      <Tab
        menu={{ color: 'grey' }}
        className="no-border"
        panes={panes}
        onTabChange={onTabChange}
      />
    );
  }
}
