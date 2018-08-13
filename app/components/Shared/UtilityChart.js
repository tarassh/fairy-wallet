import React, { Component } from 'react';

const numeral = require('numeral');

type Props = {
  stats: {}
};

class UtilityChart extends Component<Props> {
  render() {
    const { stats } = this.props;
    const currentlWidth = stats.used > stats.max ? '100%' : numeral(stats.used/stats.max).format('0%');
    const height = '5';

    const color = stats.used > stats.max ? 'lightcoral' : 'cyan';
    
    const content = (
      <svg width='100%' height={height}>
        <g>
          <rect width='100%' height={height} style={{fill: 'lightgrey'}} />
          <rect width={currentlWidth} height={height} style={{fill:  color }} />
        </g>
      </svg>
    );

    return content;
  }
}

export default UtilityChart;
