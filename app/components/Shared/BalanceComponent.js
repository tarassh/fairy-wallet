import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import {
  numberToAsset,
  assetToNumber,
  numberToPrettyAsset
} from '../../utils/asset';
import FairyMenu from './UI/FairyMenu';
import FairyDataBlock from './UI/FairyDataBlock';

const moment = require('moment');
const numeral = require('numeral');
const exactMath = require('exact-math');

type Props = {
  account: {},
  currency: {}
};

class BalanceComponent extends Component<Props> {
  render() {
    const {
      account,
      currency,
    } = this.props;

    const {
      total,
      totalNum,
      liquid,
      staked,
      unstaking,
      unstakingTime
    } = balanceStats(account);

    let totalUDS = '';
    if (currency.exchangePairs.length > 0) {
      let value = totalNum * currency.exchangePairs[0].value;
      value = numeral(value).format('0,0.00$');
      totalUDS = `Total Balance • ${value}`;
    }

    return (
      <FairyMenu>
        <FairyMenu.MenuItem>
          <FairyDataBlock 
            data={<p className="title">{total}</p>}
            description={<p className="subtitle">{totalUDS}</p>}
          />
        </FairyMenu.MenuItem>
        <FairyMenu.MenuItem>
          <FairyDataBlock 
            data={<p className="title">{liquid}</p>}
            description={<p className="subtitle">Available</p>}
          />
        </FairyMenu.MenuItem>
        <FairyMenu.MenuItem>
          <FairyDataBlock 
            data={<p className="title">{staked}</p>}
            description={<p className="subtitle">Staked</p>}
          />
        </FairyMenu.MenuItem>
        {/* {unstaking && (
          <FairyMenu.MenuItem>
            <p className="subtitle">
              <Icon
                name="info circle"
                size="small"
                style={{ color: 'rgb(62, 141, 247)' }}
              />
              {unstaking} will be available {unstakingTime}
            </p>
          </FairyMenu.MenuItem>
          )} */}
      </FairyMenu>
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
  const total = exactMath.add(staked, unstaking, liquid);

  const stats = {
    total: numberToPrettyAsset(total),
    liquid: numberToPrettyAsset(liquid),
    staked: numberToPrettyAsset(staked),

    totalNum: total,
    liquidNum: liquid,
    stakedNum: staked
  };

  if (unstaking > 0) {
    const timeLeft = new Date(account.refund_request.request_time);
    timeLeft.setDate(timeLeft.getDate() + 3);
    const time = moment(timeLeft).fromNow();

    Object.assign(stats, {
      unstaking: numberToAsset(unstaking),
      unstakingTime: time,

      unstakingNum: unstaking
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
    return exactMath.add(
      assetToNumber(delegated.cpu_weight),
      assetToNumber(delegated.net_weight)
    );
  }
  return 0;
}

function unstakingBalance(request) {
  if (request && request !== null) {
    const requestTime = new Date(request.request_time);
    requestTime.setDate(requestTime.getDate() + 3);
    if (requestTime - Date.now() < 0) return 0;
    return exactMath.add(
      assetToNumber(request.cpu_amount),
      assetToNumber(request.net_amount)
    );
  }
  return 0;
}

export default BalanceComponent;
