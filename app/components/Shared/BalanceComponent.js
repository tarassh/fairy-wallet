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
  currency: {},
  settings: {}
};

class BalanceComponent extends Component<Props> {
  render() {
    const { account, currency, settings } = this.props;

    const {
      total,
      totalNum,
      liquid,
      staked,
      unstaking,
      unstakingTime
    } = balanceStats(account);

    let totalUDS = 'Total Balance';
    let availableCur = 'Available';
    let stakedCur = 'Staked';
    if (currency.exchangePairs.length > 0) {
      const exchange = currency.exchangePairs.find(
        el => el.to === settings.exchangeCurrency.toUpperCase()
      );
      if (exchange) {
        let value = totalNum * exchange.value;
        value = `${numeral(value).format('0,0.00')}${exchange.symbol}`;
        totalUDS = `Total Balance • ${value}`;

        value = assetToNumber(liquid) * exchange.value;
        value = `${numeral(value).format('0,0.00')}${exchange.symbol}`;
        availableCur = `Available • ${value}`;

        value = assetToNumber(staked) * exchange.value;
        value = `${numeral(value).format('0,0.00')}${exchange.symbol}`;
        stakedCur = `Staked • ${value}`;
      }
    }

    return (
      <span>
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
              description={<p className="subtitle">{availableCur}</p>}
            />
          </FairyMenu.MenuItem>
          <FairyMenu.MenuItem>
            <FairyDataBlock
              data={<p className="title">{staked}</p>}
              description={<p className="subtitle">{stakedCur}</p>}
            />
          </FairyMenu.MenuItem>
        </FairyMenu>
        {unstaking && (
          <p className="subtitle" style={{ margin: '-2rem 0 0 1rem' }}>
            <Icon
              name="info circle"
              size="small"
              style={{ color: 'rgb(62, 141, 247)' }}
            />
            {unstaking} will be available {unstakingTime}
          </p>
        )}
      </span>
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
