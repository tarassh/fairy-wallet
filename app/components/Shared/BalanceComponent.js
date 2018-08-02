import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import {
  numberToAsset,
  assetToNumber,
  numberToPrettyAsset
} from '../../utils/asset';

const moment = require('moment');

type Props = {
  account: {}
};

class BalanceComponent extends Component<Props> {
  render() {
    const { account } = this.props;

    const { total, liquid, staked, unstaking, unstakingTime } = balanceStats(
      account
    );

    return (
      <div>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <h5>Total Balance</h5>
                <h4>{total}</h4>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Row textAlign="center">
              <Grid.Column width={8}>
                <h5>Available</h5>
                <h4>{liquid}</h4>
                {unstaking && (
                  <h5>
                    {unstaking} will be available {unstakingTime}
                  </h5>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <h5>Staked</h5>
                <h4>{staked}</h4>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

function balanceStats(account) {
  const {
    refund_request, // eslint-disable-line camelcase
    core_liquid_balance, // eslint-disable-line camelcase
    self_delegated_bandwidth // eslint-disable-line camelcase
  } = account;
  const staked = stakedBalance(self_delegated_bandwidth);
  const unstaking = unstakingBalance(refund_request);
  const liquid = liquidBalance(core_liquid_balance);
  const total = staked + unstaking + liquid;

  const stats = {
    total: numberToPrettyAsset(total),
    liquid: numberToPrettyAsset(liquid),
    staked: numberToPrettyAsset(staked)
  };

  if (unstaking > 0) {
    const timeLeft = new Date(account.refund_request.request_time);
    timeLeft.setDate(timeLeft.getDate() + 3);
    const time = moment(timeLeft).fromNow();

    Object.assign(stats, {
      unstaking: numberToAsset(unstaking),
      unstakingTime: time
    });
  }

  return stats;
}

function liquidBalance(liqidBalance) {
  if (liqidBalance && liqidBalance !== null) {
    return assetToNumber(liqidBalance);
  }
  return 0;
}

function stakedBalance(delegated) {
  if (delegated && delegated !== null) {
    return (
      assetToNumber(delegated.cpu_weight) + assetToNumber(delegated.net_weight)
    );
  }
  return 0;
}

function unstakingBalance(request) {
  if (request && request !== null) {
    const requestTime = new Date(request.request_time);
    requestTime.setDate(requestTime.getDate() + 3);
    if (requestTime - Date.now() < 0) return 0;
    return (
      assetToNumber(request.cpu_amount) + assetToNumber(request.net_amount)
    );
  }
  return 0;
}

export default BalanceComponent;
