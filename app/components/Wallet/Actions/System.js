import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import SystemStake from './System/Stake';
import SystemRam from './System/Ram';

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
  buyram: () => {}
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
        key: 'ram',
        menuItem: 'Buy Ram',
        render: () => (
          <SystemRam
            transactions={this.props.transactions}
            account={account}
            buyram={this.props.buyram}
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
