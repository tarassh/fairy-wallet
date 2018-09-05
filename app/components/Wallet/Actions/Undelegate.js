import _ from 'lodash';
import React, { Component } from 'react';
import { Form, Grid, List, Label } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
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
  transactions: {},
  undelegate: (string, string, string, string) => {},
  setDelegateeAccount: (string) => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

const colors = [
  '241,158,41',
  '192,71,222',
  '55,188,150',
  '68,91,200',
  '253,112,62',
  '108,182,42',
  '207,44,64'
];

export default class Undelegate extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = Object.assign(
      {
        openModal: false,
        cpuDelta: 0,
        netDelta: 0,
        recipient: '', 
        cpu: 0,
        net: 0
      },
      this.getStakedValues(props.account.account_name)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!_.eq(this.props.delegates, nextProps.account.account_name)) {
      const staked = this.getStakedValuesFor(nextProps.account.account_name, nextProps.delegates);
      Object.assign(this.state, {
        recipient: nextProps.account.account_name,
        cpu: staked.cpu,
        net: staked.net
      });
    }
  }

  isDelegatedTo = (name) => {
    const { delegates } = this.props;
    return delegates.find((el) => el.to === name) !== undefined;
  }

  getStakedValues = (name) => {
    const { delegates } = this.props;
    return this.getStakedValuesFor(name, delegates);
  }

  getStakedValuesFor = (name, delegates) => {
    const delegatee = delegates.find((el) => el.to === name);
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
    }
  }

  handleDelegateSelect = (e, { name }) => {
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
    this.props.setDelegateeAccount(stakes ? stakes.recipient : undefined);
  }

  handleRecipientChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    const stakes = this.getStakedValues(value);
    if (stakes) {
      this.props.setDelegateeAccount(stakes.recipient);
      this.setState({cpu: stakes.cpu, net: stakes.net});
    } else {
      this.props.setDelegateeAccount(undefined);
      this.setState({cpu: 0, net: 0});
    }
  };

  handleChange = (e, { name, value }) => {
    if (value === '') {
      this.setState({[name]: value});
      return;
    }
    const staked = this.getStakedValues(this.state.recipient);
    
    const intValue = exactMath.mul(parseFloat(value), fraction10000);
    const delta = intValue - staked[name];
    
    this.setState({
      [name]: intValue,
      [`${name}Delta`]: delta
    })
  }

  handleSubmit = () => {
    const { cpuDelta, netDelta, recipient } = this.state;
    const { account } = this.props;
    const accountName = account.account_name;

    const cpu = numberToAsset(Math.abs(exactMath.div(cpuDelta, fraction10000)));
    const net = numberToAsset(Math.abs(exactMath.div(netDelta, fraction10000)));

    this.props.undelegate(accountName, recipient, net, cpu);
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

  validateFields = () => {
    const { cpuDelta, netDelta, recipient } = this.state;
    const { cpu, net } = this.state;

    if (!this.isDelegatedTo(recipient)) {
      return false;
    }

    if (cpuDelta === 0 && netDelta === 0) {
      return false;
    } 

    if (cpu === '' || net === '') {
      return false;
    }

    return true;
  }

  validateStakes = (min, val, staked, isCpu) => {
    const stakedVal = staked[isCpu ? 'cpu' : 'net'];
    const invalid = { isInvalid: true, className: 'invalid' };

    if (val < min) {
      invalid.message = `Its not recomended to have ${isCpu ? 'CPU' : 'NET'} below ${min} EOS`;
      return invalid;
    } else if (val > exactMath.div(stakedVal, fraction10000)) {
      invalid.message = `Cannot exceed ${exactMath.div(stakedVal, fraction10000)} EOS`;
      return invalid;
    }

    return {
      isInvalid: false
    }
  }

  renderForm = () => {
    const { transactions, account } = this.props;
    const { openModal, recipient } = this.state;
    let { cpu, net } = this.state;
    if (typeof cpu === 'number') {
      cpu = exactMath.div(cpu, fraction10000);
    }
    if (typeof net === 'number') {
      net = exactMath.div(net, fraction10000);
    }

    const staked = this.getStakedValues(recipient);

    const min = staked.recipient === account.account_name ? 0.5 : 0;
    const validCpu = this.validateStakes(min, cpu, staked, true);
    const validNet = this.validateStakes(min, net, staked, false);

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
            label="From"
            name="recipient"
            disabled
            value={recipient}
            onChange={this.handleRecipientChange}
          />
          <InputFloat
            label={validCpu.isInvalid ? validCpu.message : 'CPU (EOS)'}
            name="cpu"
            step="0.0001"
            min={0}
            max={Number.MAX_SAFE_INTEGER}
            value={cpu}
            type="number"
            className={validCpu.className}
            onChange={this.handleChange}
          />
          <InputFloat
            label={validNet.isInvalid ? validNet.message : 'NET (EOS)'}
            name="net"
            step="0.0001"
            min={0}
            max={Number.MAX_SAFE_INTEGER}
            value={net}
            type="number"
            className={validNet.className}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Button
          id="form-button-control-public"
          content="Undelegate"
          disabled={validCpu.isInvalid || validNet.isInvalid}
        />
      </Form>
    );
  };

  renderDelegate = (delegate, color) => {
    const cpu = numeral(assetToNumber(delegate.cpu_weight)).format('0,0.0000');
    const net = numeral(assetToNumber(delegate.net_weight)).format('0,0.0000');
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <span><Label circular empty style={{background: color}} /> {delegate.to}</span>
          </Grid.Column>
          <Grid.Column textAlign="right" width={5}>{cpu}</Grid.Column>
          <Grid.Column textAlign="right" width={5}>{net}</Grid.Column>
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
        header={
          this.renderHeader()
        }
        content={
          <List selection divided>
            {_.map(delegates, (delegate, i) => (
              <List.Item 
                key={delegate.to} 
                name={delegate.to} 
                onClick={this.handleDelegateSelect} 
                active={recipient === delegate.to}
              >
                <List.Content>{this.renderDelegate(delegate, `rgb(${colors[i % delegates.length]}`)}</List.Content>
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
        subtitle="Here you can undelegate your resources from accounts"
        className="adjust-content"
        content={
          <div className="stake">
            <div className="stake-form" >
              {this.renderForm()}
            </div>
            <div className="stake-delegation-table" >
              {this.renderDelegates()}
            </div>
          </div>
        }
      />
    );
  }
}
