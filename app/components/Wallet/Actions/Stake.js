import _ from 'lodash';
import React, { Component } from 'react';
import { Form, Grid, Divider, List } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import { InputFloat, InputAccount } from '../../Shared/EosComponents';

const numeral = require('numeral');
const exactMath = require('exact-math');

const fraction10000 = 10000;

type Props = {
  account: {},
  delegates: {},
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
    showDetails: false,
    recipient: ''
  };

  handleClick = () => {
    const { showDetails } = this.state;
    this.setState({ showDetails: !showDetails });
  };

  handleValueChange = value => {
    this.handleChange(null, { name: 'value', value: value.toString() });
  };

  handleRecipientChange = (e, { name, value }) => {
    this.setState({ [name]: value });
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
    const { cpuDelta, netDelta, recipient } = this.state;
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
        this.props.delegate(accountName, recipient, net, cpu);
        break;

      case 4:
      case 8:
      case 12:
      case 13:
      case 14:
        this.props.undelegate(accountName, recipient, net, cpu);
        break;

      case 6:
        this.props.delegateUndelegate(true, accountName, recipient, net, cpu);
        break;

      case 9:
        this.props.delegateUndelegate(false, accountName, recipient, net, cpu);
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

  renderForm = () => {
    const { transactions, account } = this.props;
    const { cpuDelta, netDelta, openModal, recipient } = this.state;

    const enableRequest = cpuDelta !== 0 || netDelta !== 0;
    const { staked, total } = balanceStats(account);
    const value = exactMath
      .div(exactMath.add(staked, netDelta, cpuDelta), fraction10000)
      .toFixed(4);

    return (
      <Form onSubmit={this.handleSubmit}>
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
        />
        <Form.Field>
          <InputAccount
            id="form-input-control-recipient"
            label="Recipient"
            name="recipient"
            value={recipient}
            onChange={this.handleRecipientChange}
          />
          <InputFloat
            label="CPU (EOS)"
            name="stake"
            step="0.0001"
            min={1.0}
            max={total / fraction10000}
            value={value}
            type="number"
            onChange={this.handleChange}
          />
          <InputFloat
            label="NET (EOS)"
            name="stake"
            step="0.0001"
            min={1.0}
            max={total / fraction10000}
            value={value}
            type="number"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Button
          id="form-button-control-public"
          content="Update Stake"
          disabled={!enableRequest}
        />
      </Form>
    );
  };

  renderDelegate = delegate => {
    const cpu = numeral(assetToNumber(delegate.cpu_weight)).format('0,0.0000');
    const net = numeral(assetToNumber(delegate.net_weight)).format('0,0.0000');
    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <p>{delegate.to}</p>
          </Grid.Column>
          <Grid.Column textAlign="right">{cpu}</Grid.Column>
          <Grid.Column textAlign="right">{net}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  renderHeader = () => (
    <Grid className="tableheader">
      <Grid.Row columns={3}>
        <Grid.Column>
          <p className="tableheadertitle">account</p>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <p className="tableheadertitle">cpu, eos</p>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <p className="tableheadertitle">net, eos</p>
        </Grid.Column>
      </Grid.Row>
      <Divider />
    </Grid>
  );

  renderDelegates = () => {
    let { delegates } = this.props;
    if (delegates && delegates === null) {
      delegates = [];
    }

    return (
      <div>
        {this.renderHeader()}
        <List selection divided>
          {_.map(delegates, delegate => (
            <List.Item key={delegate.to}>
              <List.Content>{this.renderDelegate(delegate)}</List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    );
  };

  render() {
    return (
      <div>
        <p className="title">Stake</p>
        <p className="subtitle">Update your staking value</p>
        <br />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>{this.renderForm()}</Grid.Column>
            <Grid.Column>{this.renderDelegates()}</Grid.Column>
          </Grid.Row>
        </Grid>
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
