import _ from 'lodash';
import React, { Component } from 'react';
import { Form, Grid, List, Label } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import PermissionButton from '../../Shared/UI/PermissionButton';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import { InputFloat, InputAccount } from '../../Shared/EosComponents';
import MainContentContainer from '../../Shared/UI/MainContent';
import ScrollingTable from '../../Shared/UI/ScrollingTable';

const numeral = require('numeral');
const exactMath = require('exact-math');

const fraction10000 = 10000;

type Props = {
  account: {},
  delegates: {},
  transaction: {},
  actions: {}
};

export default class Delegate extends Component<Props> {
  constructor(props) {
    super(props);

    const { account } = props;
    this.state = Object.assign(
      {
        openModal: false,
        cpuDelta: 0,
        netDelta: 0,
        recipient: '',
        cpu: 0,
        net: 0,
        permission: ''
      },
      this.getStakedValues(account.account_name)
    );
  }

  isDelegatedTo = name => {
    const { delegates } = this.props;
    return delegates.find(el => el.to === name) !== undefined;
  };

  getStakedValues = name => {
    const { delegates } = this.props;
    const delegatee = delegates.find(el => el.to === name);
    if (delegatee) {
      return {
        cpu: assetToNumber(delegatee.cpu_weight, true),
        net: assetToNumber(delegatee.net_weight, true),
        recipient: name
      };
    }
    return {
      cpu: 0,
      net: 0,
      recipient: name
    };
  };

  handleDelegateSelect = (e, { name }) => {
    const { actions } = this.props;
    const stakes = this.getStakedValues(name);
    if (this.recipient !== name) {
      if (stakes) {
        this.setState({
          cpu: stakes.cpu,
          net: stakes.net,
          recipient: stakes.recipient,
          cpuDelta: 0,
          netDelta: 0
        });
      }
    }
    actions.setDelegateeAccount(stakes ? stakes.recipient : undefined);
  };

  handleRecipientChange = (e, { name, value }) => {
    const { actions } = this.props;
    this.setState({ [name]: value });
    const stakes = this.getStakedValues(value);
    if (stakes) {
      actions.setDelegateeAccount(stakes.recipient);
      this.setState({ cpu: stakes.cpu, net: stakes.net });
    } else {
      actions.setDelegateeAccount(undefined);
      this.setState({ cpu: 0, net: 0 });
    }
  };

  handleChange = (e, { name, value }) => {
    if (value === '' || name === 'permission') {
      this.setState({ [name]: value });
      return;
    }
    const staked = this.getStakedValues(this.state.recipient);

    const intValue = exactMath.mul(parseFloat(value), fraction10000);
    const delta = intValue - staked[name];

    this.setState({
      [name]: intValue,
      [`${name}Delta`]: delta
    });
  };

  handleSubmit = () => {
    const { cpuDelta, netDelta, recipient, permission } = this.state;
    const { account, actions } = this.props;
    const accountName = account.account_name;

    const cpu = numberToAsset(Math.abs(exactMath.div(cpuDelta, fraction10000)));
    const net = numberToAsset(Math.abs(exactMath.div(netDelta, fraction10000)));

    actions.checkAndRun(
      actions.delegate,
      accountName,
      recipient,
      net,
      cpu,
      permission
    );

    this.setState({ openModal: true });
  };

  handleClose = () => {
    const { account, actions } = this.props;

    actions.resetState();
    actions.getAccount(account.account_name);
    this.setState({ openModal: false, cpuDelta: 0, netDelta: 0 });
  };

  validateFields = () => {
    const { cpuDelta, netDelta, recipient, cpu, net } = this.state;

    if (recipient === '') {
      return false;
    }

    if (this.isDelegatedTo(recipient)) {
      if (cpuDelta === 0 && netDelta === 0) {
        return false;
      }
    } else if (cpu === 0 && net === 0) {
      return false;
    }

    if (cpu === '' || net === '') {
      return false;
    }

    const staked = this.getStakedValues(recipient);
    if (net < staked.net || cpu < staked.cpu) {
      return false;
    }

    return true;
  };

  renderForm = () => {
    const { transaction, account } = this.props;
    const { openModal, recipient } = this.state;
    let { cpu, net } = this.state;
    if (typeof cpu === 'number') {
      cpu /= fraction10000;
    }
    if (typeof net === 'number') {
      net /= fraction10000;
    }

    const { liquid } = balanceStats(account);
    const staked = this.getStakedValues(recipient);
    const stakedCpu = exactMath.div(staked.cpu, fraction10000);
    const stakedNet = exactMath.div(staked.net, fraction10000);

    let cpuInvalid;
    let netInvalid;

    const enableRequest = this.validateFields();
    if (!enableRequest) {
      cpuInvalid = cpu < stakedCpu ? 'invalid' : undefined;
      netInvalid = net < stakedNet ? 'invalid' : undefined;
    }

    const total = staked.cpu + staked.net + liquid;

    return (
      <Form onSubmit={this.handleSubmit}>
        <TransactionsModal
          open={openModal}
          transaction={transaction}
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
            label={
              cpuInvalid
                ? `Cannot be lower than ${numeral(stakedCpu).format(
                    '0.0000'
                  )} EOS`
                : 'CPU (EOS)'
            }
            name="cpu"
            step="0.0001"
            min={0}
            max={total / fraction10000}
            value={cpu}
            type="number"
            className={cpuInvalid}
            onChange={this.handleChange}
          />
          <InputFloat
            label={
              netInvalid
                ? `Cannot be lower than ${numeral(stakedNet).format(
                    '0.0000'
                  )} EOS`
                : 'NET (EOS)'
            }
            name="net"
            step="0.0001"
            min={0}
            max={total / fraction10000}
            value={net}
            type="number"
            className={netInvalid}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Group id="form-button-control-public">
          <PermissionButton 
            content="Delegate"
            disabled={!enableRequest}
            account={account}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
  };

  renderDelegate = (delegate, colorClass) => {
    const cpu = numeral(assetToNumber(delegate.cpu_weight)).format('0,0.0000');
    const net = numeral(assetToNumber(delegate.net_weight)).format('0,0.0000');
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <span>
              <Label circular empty className={colorClass} /> {delegate.to}
            </span>
          </Grid.Column>
          <Grid.Column textAlign="right" width={5}>
            {cpu}
          </Grid.Column>
          <Grid.Column textAlign="right" width={5}>
            {net}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  renderHeader = () => (
    <Grid className="tableheader">
      <Grid.Row>
        <Grid.Column width={6}>
          <p className="tableheadertitle">delegated to</p>
        </Grid.Column>
        <Grid.Column textAlign="center" width={5}>
          <p className="tableheadertitle">cpu, eos</p>
        </Grid.Column>
        <Grid.Column textAlign="right" width={5}>
          <p className="tableheadertitle">net, eos</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  renderDelegates = () => {
    const { recipient } = this.state;
    let { delegates } = this.props;
    if (delegates && delegates === null) {
      delegates = [];
    } else if (delegates.length > 1) {
      const index = delegates.findIndex(el => el.to === el.from);
      if (index > 0) {
        delegates.splice(0, 0, delegates.splice(index, 1)[0]);
      }
    }

    return (
      <ScrollingTable
        header={this.renderHeader()}
        content={
          <List selection divided>
            {_.map(delegates, (delegate, i) => (
              <List.Item
                key={delegate.to}
                name={delegate.to}
                onClick={this.handleDelegateSelect}
                active={recipient === delegate.to}
              >
                <List.Content>
                  {this.renderDelegate(
                    delegate,
                    `delegate-background-color-${i % delegates.length}`
                  )}
                </List.Content>
              </List.Item>
            ))}
          </List>
        }
      />
    );
  };

  render() {
    return (
      <MainContentContainer
        title="Stake Management"
        subtitle="Here you can delegate your resources to another accounts"
        className="adjust-content"
        content={
          <div className="stake">
            <div className="stake-form">{this.renderForm()}</div>
            <div className="stake-delegation-table">
              {this.renderDelegates()}
            </div>
          </div>
        }
      />
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
