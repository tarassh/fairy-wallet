import React, { Component } from 'react';
import BuyRam from './BuyRam';
import SellRam from './SellRam';
import MainContentContainer from './../../Shared/UI/MainContent';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

export default class Ram extends Component<Props> {
  render() {
    const { transaction, account, actions } = this.props;

    return (
      <MainContentContainer 
        title="RAM management" 
        subtitle="Manage your RAM resource"
        className="adjust-content"
        content={
          <div className="ram">
            <div className="buy-ram" >
              <BuyRam
                transaction={transaction}
                account={account}
                actions={actions}
              />
            </div>
            <div className="sell-ram" >
              <SellRam
                transaction={transaction}
                account={account}
                actions={actions}
              />
            </div>
          </div>
        } 
      />
    );
  }
}
