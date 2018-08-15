import React, { Component } from 'react';
import { Form, Segment, Input, Grid, Icon, Divider } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import { InputFloat } from '../../Shared/EosComponents';

const numeral = require('numeral');
const exactMath = require('exact-math');

const fraction10000 = 10000;

type Props = {
  account: {},
  transactions: {},
  delegate: (string, string, string, string) => {},
  undelegate: (string, string, string, string) => {},
  delegateUndelegate: (boolean, string, string, string, string) => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

export default class Stake extends Component<Props> {
  state = {
    openModal: false,
    cpuDelta: 0,
    netDelta: 0,
    showDetails: false
  };

  handleClick = () => {
    const { showDetails } = this.state;
    this.setState({ showDetails: !showDetails });
  };

  handleValueChange = value => {
    this.handleChange(null, { name: 'value', value: value.toString() });
  };

  handleChange = (e, { name, value }) => {
    const { account } = this.props;
    const { staked } = balanceStats(account);

    const delta = exactMath.mul(parseFloat(value), fraction10000) - staked;
    const half = exactMath.div(delta, 2);
    let netDelta = delta < 0 ? Math.ceil(half) : Math.floor(half);
    let cpuDelta = delta < 0 ? Math.ceil(half) : Math.floor(half);

    if (Math.abs(delta % 2) === 1) {
      if (delta > 0) {
        cpuDelta += 1;
      } else if (delta < 0) {
        netDelta -= 1;
      }
    }

    this.setState({ [name]: value, cpuDelta, netDelta });
  };

  handleSubmit = () => {
    const { cpuDelta, netDelta } = this.state;
    const { account } = this.props;
    const accountName = account.account_name;

    const cpu = numberToAsset(Math.abs(exactMath.div(cpuDelta, fraction10000)));
    const net = numberToAsset(Math.abs(exactMath.div(netDelta, fraction10000)));

    // Use of Karnaugh map
    // https://en.wikipedia.org/wiki/Karnaugh_map
    const iC = cpuDelta > 0 ? 1 : 0;
    const iN = netDelta > 0 ? 1 : 0;
    const dC = cpuDelta < 0 ? 1 : 0;
    const dN = netDelta < 0 ? 1 : 0;

    const f = (dN << 3) | (dC << 2) | (iN << 1) | iC; // eslint-disable-line no-bitwise

    switch (f) {
      case 1:
      case 2:
      case 3:
      case 7:
      case 11:
        this.props.delegate(accountName, accountName, net, cpu);
        break;

      case 4:
      case 8:
      case 12:
      case 13:
      case 14:
        this.props.undelegate(accountName, accountName, net, cpu);
        break;

      case 6:
        this.props.delegateUndelegate(true, accountName, accountName, net, cpu);
        break;

      case 9:
        this.props.delegateUndelegate(
          false,
          accountName,
          accountName,
          net,
          cpu
        );
        break;

      default:
        return;
    }

    this.setState({ openModal: true });
  };

  handleClose = () => {
    const { account } = this.props;

    this.props.resetState();
    this.props.getAccount(account.account_name);
    this.props.getActions(account.account_name);
    this.setState({
      openModal: false,
      cpuDelta: 0,
      netDelta: 0
    });
  };

  render() {
    const { transactions, account } = this.props;
    const { cpuDelta, netDelta, openModal, showDetails } = this.state;

    const enableRequest = cpuDelta !== 0 || netDelta !== 0;
    const { staked, total, detailed } = balanceStats(account);
    const value = exactMath
      .div(exactMath.add(staked, netDelta, cpuDelta), fraction10000)
      .toFixed(4);

    const stakedAssets = numeral(exactMath.div(staked, fraction10000)).format(
      '0,0.0000'
    );

    const newValue = numeral(
      exactMath.div(exactMath.add(staked, netDelta, cpuDelta), fraction10000)
    ).format('0,0.0000');

    const newValueDelta = numeral(
      exactMath.div(exactMath.add(netDelta, cpuDelta), fraction10000)
    ).format('0,0.0000');

    const detailedCpu = numeral(
      exactMath.div(detailed.cpu, fraction10000)
    ).format('0,0.0000');

    const newCpu = numeral(
      exactMath.div(exactMath.add(detailed.cpu, cpuDelta), fraction10000)
    ).format('0,0.0000');

    const deltaCpuSt = numeral(exactMath.div(cpuDelta, fraction10000)).format(
      '0,0.0000'
    );

    const detailedNet = numeral(
      exactMath.div(detailed.net, fraction10000)
    ).format('0,0.0000');

    const newNet = numeral(
      exactMath.div(exactMath.add(detailed.net, netDelta), fraction10000)
    ).format('0,0.0000');

    const deltaNetSt = numeral(exactMath.div(netDelta, fraction10000)).format(
      '0,0.0000'
    );

    const detailIcon = showDetails ? 'search minus' : 'search plus';
    const deltaColor = { color: 'rgb(200, 71, 80)' };

    return (
      <div>
        <p className="title">Stake</p>
        <p className="subtitle">Update your staking value</p>
        <br />
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleSubmit}>
          <Segment>
            <Grid columns="equal" divided inverted>
              <Grid.Row
                style={{ cursor: 'pointer' }}
                onClick={() => this.handleClick()}
              >
                <Grid.Column width={3} verticalAlign="bottom">
                  <Icon name={detailIcon} />Total
                </Grid.Column>
                <Grid.Column width={4} textAlign="right">
                  Staked, EOS
                  <p>{stakedAssets}</p>
                </Grid.Column>
                <Grid.Column width={4} textAlign="right">
                  New Staked, EOS
                  <p>{newValue}</p>
                </Grid.Column>
                <Grid.Column width={4} textAlign="right">
                  Delta, EOS
                  <p
                    style={
                      exactMath.add(netDelta, cpuDelta) < 0 ? deltaColor : {}
                    }
                  >
                    {newValueDelta}
                  </p>
                </Grid.Column>
              </Grid.Row>
              {showDetails && <Divider />}
              {showDetails && (
                <Grid.Row>
                  <Grid.Column width={3}>CPU</Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    <p>{detailedCpu}</p>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    <p>{newCpu}</p>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    <p style={cpuDelta < 0 ? deltaColor : {}}>{deltaCpuSt}</p>
                  </Grid.Column>
                </Grid.Row>
              )}
              {showDetails && (
                <Grid.Row>
                  <Grid.Column width={3}>Network</Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    <p>{detailedNet}</p>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    <p>{newNet}</p>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="right">
                    <p style={netDelta < 0 ? deltaColor : {}}>{deltaNetSt}</p>
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </Segment>
          <Form.Field>
            <InputFloat
              label="Value (EOS)"
              name="stake"
              step="0.0001"
              min={1.0}
              max={total / fraction10000}
              value={value}
              type="number"
              onChange={this.handleChange}
            />
            <Input
              name="stake"
              step="0.0001"
              min={1.0}
              max={total / fraction10000}
              value={value}
              type="range"
              onChange={this.handleChange}
              style={{ padding: '2em' }}
            />
          </Form.Field>
          <Form.Button
            id="form-button-control-public"
            content="Update Stake"
            disabled={!enableRequest}
          />
        </Form>
      </div>
    );
  }
}

function balanceStats(account) {
  const detailed = { net: 0, cpu: 0 };
  const liquid = assetToNumber(account.core_liquid_balance, true);
  let staked = 0;
  if (
    account.self_delegated_bandwidth &&
    account.self_delegated_bandwidth !== null
  ) {
    const cpu = assetToNumber(
      account.self_delegated_bandwidth.cpu_weight,
      true
    );
    const net = assetToNumber(
      account.self_delegated_bandwidth.net_weight,
      true
    );
    staked = cpu + net;

    Object.assign(detailed, {
      cpu,
      net
    });
  }
  let unstaking = 0;
  if (account.refund_request && account.refund_request !== null) {
    unstaking =
      assetToNumber(account.refund_request.net_amount, true) +
      assetToNumber(account.refund_request.cpu_amount, true);
  }

  return {
    total: liquid + staked + unstaking,
    liquid,
    staked,
    unstaking,
    detailed
  };
}
