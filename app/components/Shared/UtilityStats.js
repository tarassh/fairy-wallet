import React, { Component } from 'react';
import UtilityChart from './UtilityChart';

const numeral = require('numeral');

type Props = {
  account: {}
};

class UtilityStats extends Component<Props> {
  render() {
    const { account } = this.props;
    const cpuUsage = numeral(
      account.cpu_limit.used / account.cpu_limit.max
    ).format('0%');
    const netUsage = numeral(
      account.net_limit.used / account.net_limit.max
    ).format('0%');
    const ramUsage = numeral(account.ram_usage / account.ram_quota).format(
      '0%'
    );

    const content = (
      <ul className="utility-chart">
        <li>
          <div>CPU</div>
          <div>
            <UtilityChart
              stats={{
                used: account.cpu_limit.used,
                max: account.cpu_limit.max
              }}
            />
          </div>
          <div>{cpuUsage}</div>
        </li>
        <li>
          <div>NET</div>
          <div>
            <UtilityChart
              stats={{
                used: account.net_limit.used,
                max: account.net_limit.max
              }}
            />
          </div>
          <div className="subtitle">{netUsage}</div>
        </li>
        <li>
          <div>RAM</div>
          <div>
            <UtilityChart
              stats={{ used: account.ram_usage, max: account.ram_quota }}
            />
          </div>
          <div>{ramUsage}</div>
        </li>
      </ul>
    );

    return content;
  }
}

export default UtilityStats;
