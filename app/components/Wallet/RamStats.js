// @flow
import React, { Component } from 'react';
import StakeChart from '../Shared/StakeChart';
import MainContentContainer from './../Shared/UI/MainContent';

const prettyBytes = require('pretty-bytes');

type Props = {
  account: {}
};

class RamStats extends Component<Props> {
  render() {
    const { account } = this.props;
    const { ram_usage, ram_quota} = account;

    return (
      <MainContentContainer 
        title="RAM information" 
        subtitle=""
        content={(
          <div className='side-padding'>
            <StakeChart
              stakes={[ram_usage]}
              max={ram_quota}
            />
            <p>RAM Used {prettyBytes(ram_usage)}&nbsp;/&nbsp;{prettyBytes(ram_quota)}</p>
          </div>
        )}
      />
    );
  }
}

export default RamStats;
