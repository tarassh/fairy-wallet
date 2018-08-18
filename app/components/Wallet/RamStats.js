// @flow
import React, { Component } from 'react';
import StakeChart from '../Shared/StakeChart';

const prettyBytes = require('pretty-bytes');

type Props = {
  account: {}
};

class RamStats extends Component<Props> {
  render() {
    const { account } = this.props;
    const { ram_usage, ram_quota} = account;

    return (
      <div>
        <p className="title">RAM Information</p>
        <p className="subtitle" />
        <br />

        <StakeChart
          stakes={[ram_usage]}
          max={ram_quota}
        />
        <p>RAM Used {prettyBytes(ram_usage)}&nbsp;/&nbsp;{prettyBytes(ram_quota)}</p>
      </div>
    );
  }
}

export default RamStats;
