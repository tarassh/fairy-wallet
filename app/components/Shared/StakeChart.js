// @flow
import React, { Component } from 'react';
import _ from 'lodash';

const numeral = require('numeral');

type Props = {
  stakes: {},
  max: number,
  colors: any,
  height: any,
  active: any
};

class StakeChart extends Component<Props> {
  constructor(props) {
    super(props);
    const colors = [
      '241,158,41',
      '192,71,222',
      '55,188,150',
      '68,91,200',
      '253,112,62',
      '108,182,42',
      '207,44,64'
    ];
    this.state = {
      colors: props.colors || colors
    };
  }

  render() {
    const { colors } = this.state;
    const { stakes, max, active } = this.props;
    let { height } = this.props;

    let prev = 0;
    const parts = _.map(stakes, s => {
      const ret = {
        o: prev,
        w: s / max
      };
      prev += s / max;
      return ret;
    });

    const activePresent =
      active >= 0 && parts.length !== 0 && active < parts.length;

    height = height || 8;
    const content = (
      <svg width="100%" height={height}>
        <g>
          <rect width="100%" height={height} style={{ fill: 'lightgrey' }} />
          <g transform="translate(0,0)">
            {_.map(parts, (p, i) => (
              <rect
                key={i}
                x={numeral(p.o).format('0%')}
                y="0%"
                width={numeral(p.w).format('0%')}
                height="100%"
                style={{
                  fill: activePresent
                    ? makeColor(colors[i % colors.length], i === active)
                    : makeColor(colors[i % colors.length])
                }}
              />
            ))}
          </g>
        </g>
      </svg>
    );

    return content;
  }
}

function makeColor(c, active = true) {
  const aplha = active ? 1 : 0.2;
  return `rgba(${c},${aplha})`;
}

export default StakeChart;
