import React, { Component } from 'react';
import _ from 'lodash';
import { assetToNumber, numberToAsset } from '../../utils/asset';


const moment = require('moment');

type Props = {
  account: {},
  newStake: number
};

class EosStakeChart extends Component<Props> {

  render() {
    const { account, newStake } = this.props;
    const { total, liquid, staked, unstaking } = balanceStats(account);
    let { time } = balanceStats(account);
    const width = 500;
    const height = 300;
    const defaultRadius = height / 3;
    const cy = height / 2;
    const step = width / 4;


    const [liqudRadius, stakingRadius] = _.map([liquid, unstaking + staked], e => (e / total) * defaultRadius);
    let diff = (newStake - staked) / total * defaultRadius;
    const newLiqudRadius = liqudRadius - diff;
    const newStakeRadius = newStake / total * defaultRadius  ;

    // let d = '';
    if (liqudRadius < liqudRadius - diff) {
      // We are unstaking.
      diff = 0; 
      const totalStaking = unstaking + staked;
      const newRatio = newStake / totalStaking;

      const start = polarToCartesian(step*3, cy, stakingRadius, 0);
      const end = polarToCartesian(step*3, cy, stakingRadius, 360 * newRatio);
      const largeArcFlag = 360 * newRatio - 0 > 180 ? "0" : "1";
      // d = [
      //   "M", start.x, start.y,
      //   "A", stakingRadius, stakingRadius, 0, largeArcFlag, 0, end.x, end.y,
      //   "L", step*3, cy,
      //   "Z"
      // ].join(" ");
    }

    if (staked - newStake > 0) {
      const timeLeft = new Date();
      timeLeft.setDate(timeLeft.getDate() + 3);
      time = moment(timeLeft).fromNow();
    }
    
    return (
      <div>
        <svg width='100%' height={height}>
          <circle cx={step} cy={cy} r={newLiqudRadius} fill='orange' />
          <circle cx={step} cy={cy} r={liqudRadius - diff} fill='lightgrey' />
          <circle cx={step} cy={cy} r={liqudRadius} stroke='grey' fill='none' className='actual-liquid' />

          <circle cx={step*3} cy={cy} r={stakingRadius + diff} fill='orange' />
          <circle cx={step*3} cy={cy} r={newStakeRadius} fill='lightgrey' />
          <circle cx={step*3} cy={cy} r={stakingRadius} stroke='grey' fill='none' className='actual-staked' />
          {/* <path fill='orange' d={d} /> */}
          <text x='0' y='20' fill='grey'>{`Available ${ numberToAsset(liquid / 10000)}`}</text>
          {time !== 0 &&
            <text x='50%' y='20' fill='orange'>{`${numberToAsset((unstaking + (staked-newStake)) / 10000)} will be available ${time}`}</text>
          }
          <text x='0' y='40' fill='grey'>{`Staked ${ numberToAsset(staked / 10000)}`}</text>
          {staked - newStake !== 0 &&
            <text x='50%' y='40' fill='lightgrey'>{`New staking ${numberToAsset(newStake / 10000)}`}</text>
          }
        </svg>
      </div>
    );
  }
}

function balanceStats(account) {
  const liquid = assetToNumber(account.core_liquid_balance, true);
  let staked = 0;
  if (account.self_delegated_bandwidth && account.self_delegated_bandwidth !== null) {
    staked = assetToNumber(account.self_delegated_bandwidth.cpu_weight, true) 
      + assetToNumber(account.self_delegated_bandwidth.net_weight, true);
  }
  let unstaking = 0;
  let time = 0;
  if (account.refund_request && account.refund_request !== null) {
    unstaking = assetToNumber(account.refund_request.net_amount, true) 
      + assetToNumber(account.refund_request.cpu_amount, true);

    const timeLeft = new Date(account.refund_request.request_time);
    timeLeft.setDate(timeLeft.getDate() + 3);
    time = moment(timeLeft).fromNow();
  }
  
  return {
    total: liquid + staked + unstaking,
    liquid,
    staked,
    unstaking,
    time
  };
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

export default EosStakeChart;
