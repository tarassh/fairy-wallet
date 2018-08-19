import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import BuyRam from './BuyRam';
import SellRam from './SellRam';
import MainContentContainer from './../../Shared/UI/MainContent';

type Props = {
  account: {},
  transactions: {},
  actions: {}
};

export default class Ram extends Component<Props> {
  render() {
    const { transactions, account, actions } = this.props;

    return (
      <MainContentContainer 
        title="RAM management" 
        subtitle="Manage your RAM resource"
        className="adjust-content"
        content={
          <div className="ram">
            <div className="buy-ram" >
              <BuyRam
                transactions={transactions}
                account={account}
                buyram={actions.buyram}
                buyrambytes={actions.buyrambytes}
                resetState={actions.resetState}
                getAccount={actions.getAccount}
                getActions={actions.getActions}
              />
            </div>
            <div className="sell-ram" >
              <SellRam
                transactions={transactions}
                account={account}
                sellram={actions.sellram}
                resetState={actions.resetState}
                getAccount={actions.getAccount}
                getActions={actions.getActions}
              />
            </div>
          </div>
        } 
      />
    );
  }
}
