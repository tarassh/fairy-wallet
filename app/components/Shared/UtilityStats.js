import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
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

    const labelWidth = 3;
    const barWidrh = 5;
    const valueWidth = 1;
    const rowPadding = { paddingTop: '0.5em', paddingBottom: '0.5em' };

    const content = (
      <Grid padded={false}>
        <Grid.Row textAlign="right" style={rowPadding}>
          <Grid.Column width={labelWidth}>
            <p className="subtitle">CPU</p>
          </Grid.Column>
          <Grid.Column width={barWidrh}>
            <UtilityChart
              stats={{
                used: account.cpu_limit.used,
                max: account.cpu_limit.max
              }}
            />
          </Grid.Column>
          <Grid.Column width={valueWidth}>
            <p className="subtitle">{cpuUsage}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="right" style={rowPadding}>
          <Grid.Column width={labelWidth}>
            <p>NET</p>
          </Grid.Column>
          <Grid.Column width={barWidrh}>
            <UtilityChart
              stats={{
                used: account.net_limit.used,
                max: account.net_limit.max
              }}
            />
          </Grid.Column>
          <Grid.Column width={valueWidth}>
            <p className="subtitle">{netUsage}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="right" style={rowPadding}>
          <Grid.Column width={labelWidth}>
            <p className="subtitle">RAM</p>
          </Grid.Column>
          <Grid.Column width={barWidrh}>
            <UtilityChart
              stats={{ used: account.ram_usage, max: account.ram_quota }}
            />
          </Grid.Column>
          <Grid.Column width={valueWidth}>
            <p className="subtitle">{ramUsage}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    return content;
  }
}

export default UtilityStats;
