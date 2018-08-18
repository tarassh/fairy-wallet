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
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <BuyRam
                  transactions={transactions}
                  account={account}
                  buyram={actions.buyram}
                  buyrambytes={actions.buyrambytes}
                  resetState={actions.resetState}
                  getAccount={actions.getAccount}
                  getActions={actions.getActions}
                />
              </Grid.Column>
              <Grid.Column>
                <SellRam
                  transactions={transactions}
                  account={account}
                  sellram={actions.sellram}
                  resetState={actions.resetState}
                  getAccount={actions.getAccount}
                  getActions={actions.getActions}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        } 
      />
      // <div>
      //   <p className="title">RAM management</p>
      //   <p className="subtitle">Manage your RAM resource</p>
      //   <br />
      //   <Grid>
      //     <Grid.Row columns={2}>
      //       <Grid.Column>
      //         <BuyRam
      //           transactions={transactions}
      //           account={account}
      //           buyram={actions.buyram}
      //           buyrambytes={actions.buyrambytes}
      //           resetState={actions.resetState}
      //           getAccount={actions.getAccount}
      //           getActions={actions.getActions}
      //         />
      //       </Grid.Column>
      //       <Grid.Column>
      //         <SellRam
      //           transactions={transactions}
      //           account={account}
      //           sellram={actions.sellram}
      //           resetState={actions.resetState}
      //           getAccount={actions.getAccount}
      //           getActions={actions.getActions}
      //         />
      //       </Grid.Column>
      //     </Grid.Row>
      //   </Grid>
      // </div>
    );
  }
}
