import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Segment, Label, Input } from 'semantic-ui-react';
import {
  delegate,
  undelegate,
  delegateUndelegate,
  resetState
} from '../../../actions/transactions';
import { getAccount, getActions } from '../../../actions/accounts';
import TransactionsModal from '../../../components/Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import { InputFloat } from '../../../components/Shared/EosComponents';

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

class StakeContainer extends Component<Props> {
  state = {
    openModal: false,
    cpuDelta: 0,
    netDelta: 0
  };

  handleValueChange = value => {
    this.handleChange(null, { name: 'value', value: value.toString() });
  };

  handleChange = (e, { name, value }) => {
    const { account } = this.props;
    let { cpuDelta, netDelta } = this.state;
    const { staked } = balanceStats(account);

    const delta = Math.trunc(parseFloat(value) * fraction10000) - staked;

    netDelta = Math.floor(delta / 2);
    cpuDelta = Math.floor(delta / 2) + (delta % 2 ? 1 : 0);

    this.setState({ [name]: value, cpuDelta, netDelta });
  };

  handleSubmit = () => {
    const { cpuDelta, netDelta } = this.state;
    const { account } = this.props;
    const accountName = account.account_name;

    const cpu = numberToAsset(Math.abs(cpuDelta / fraction10000));
    const net = numberToAsset(Math.abs(netDelta / fraction10000));

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
    const { net, cpu, cpuDelta, netDelta, openModal } = this.state;

    const enableRequest =
      net !== 0 && cpu !== 0 && (cpuDelta !== 0 || netDelta !== 0);
    let deltaIcon = '';
    if (netDelta > 0 || cpuDelta > 0) {
      deltaIcon = (
        <Label basic floating circular icon="arrow alternate circle up" />
      );
    } else if (netDelta < 0 || cpuDelta < 0) {
      deltaIcon = (
        <Label basic floating circular icon="arrow alternate circle down" />
      );
    }
    const { staked, total } = balanceStats(account);
    const value = ((staked + netDelta + cpuDelta) / fraction10000).toFixed(4);

    return (
      <Segment className="no-border">
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
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
            <InputFloat
              label="Value (EOS)"
              name="stake"
              step="0.0001"
              min={1.0}
              max={total / fraction10000}
              value={value}
              type="number"
              onChange={this.handleChange}
            >
              <input />
              {deltaIcon}
            </InputFloat>
          </Form.Field>
          <Form.Button
            id="form-button-control-public"
            content="Confirm"
            disabled={!enableRequest}
          />
        </Form>
      </Segment>
    );
  }
}

function balanceStats(account) {
  const liquid = assetToNumber(account.core_liquid_balance, true);
  let staked = 0;
  if (
    account.self_delegated_bandwidth &&
    account.self_delegated_bandwidth !== null
  ) {
    staked =
      assetToNumber(account.self_delegated_bandwidth.cpu_weight, true) +
      assetToNumber(account.self_delegated_bandwidth.net_weight, true);
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
    unstaking
  };
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      delegate,
      undelegate,
      delegateUndelegate,
      resetState,
      getAccount,
      getActions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeContainer);
