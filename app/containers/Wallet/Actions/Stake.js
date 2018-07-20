import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Segment, Label } from 'semantic-ui-react';
import {
  delegate,
  undelegate,
  resetState
} from '../../../actions/transactions';
import TransactionsModal from '../../../components/Shared/TransactionsModal';

type Props = {
  accounts: {},
  transactions: {},
  delegate: (string, string, string, string) => {},
  undelegate: (string, string, string, string) => {},
  resetState: () => {}
};

type inputProps = {
  onChange: () => {}
};

const eosToken = 'EOS';

const floatRegExp = new RegExp('^([0-9]+([.][0-9]{0,4})?|[.][0-9]{1,4})$');

const handleFloatInputValidationOnChange = (e, v, onChange) => {
  let { min, max } = v;
  const { value } = v;
  const number = parseFloat(value);
  if (!min) {
    min = 0;
  }
  if (!max) {
    max = Number.MAX_VALUE;
  }
  if (
    value === '' ||
    (floatRegExp.test(value) && (min <= number && number <= max))
  ) {
    onChange(e, v);
  }
};

const InputFloat = (props: inputProps) => {
  if (typeof props.onChange !== 'function') {
    return <Form.Input {...props} />;
  }

  const { onChange, ...parentProps } = props;

  return (
    <Form.Input
      {...parentProps}
      onChange={(e, v) => handleFloatInputValidationOnChange(e, v, onChange)}
    />
  );
};

class StakeContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);

    const { accounts } = this.props;
    const bandwidht = accounts.account.self_delegated_bandwidth;

    this.state = {
      net: assetToString(bandwidht.net_weight),
      cpu: assetToString(bandwidht.cpu_weight),
      openModal: false,
      cpuDelta: 0,
      netDelta: 0
    };
  }

  handleChange = (e, { name, value }) => {
    const { accounts } = this.props;
    let { cpuDelta, netDelta } = this.state;
    const stakedCpu = assetToFloat(
      accounts.account.self_delegated_bandwidth.cpu_weight
    );
    const stakedNet = assetToFloat(
      accounts.account.self_delegated_bandwidth.net_weight
    );
    const newValue = parseFloat(value);
    if (name === 'net') {
      netDelta = newValue - stakedNet;
    } else if (name === 'cpu') {
      cpuDelta = newValue - stakedCpu;
    }

    this.setState({ [name]: value, cpuDelta, netDelta });
  };

  handleSubmit = () => {
    const { cpuDelta, netDelta } = this.state;
    const { accounts } = this.props;
    const accountName = accounts.account.account_name;

    const cpu = `${parseFloat(Math.abs(cpuDelta)).toFixed(4)} ${eosToken}`;
    const net = `${parseFloat(Math.abs(netDelta)).toFixed(4)} ${eosToken}`;

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
        this.props.undelegate(accountName.accountName, net, cpu);
        break;

      case 6:
      case 9:
        this.props.delegate(accountName, accountName, net, cpu);
        this.props.undelegate(accountName.accountName, net, cpu);

        break;
      default:
    }

    // this.setState({ openModal: true });
  };

  handleClose = () => {
    this.props.resetState();
    this.setState({ openModal: false });
  };

  render() {
    const { accounts, transactions } = this.props;
    const { net, cpu, cpuDelta, netDelta, openModal } = this.state;
    const bandwidth = accounts.account.self_delegated_bandwidth;

    const enableRequest =
      net !== '' && cpu !== '' && (cpuDelta !== 0 || netDelta !== 0);
    let netDeltaIcon = '';
    let cpuDeltaIcon = '';
    if (netDelta > 0) {
      netDeltaIcon = (
        <Label basic floating circular icon="arrow alternate circle up" />
      );
    } else if (netDelta < 0) {
      netDeltaIcon = (
        <Label basic floating circular icon="arrow alternate circle down" />
      );
    }
    if (cpuDelta > 0) {
      cpuDeltaIcon = (
        <Label basic floating circular icon="arrow alternate circle up" />
      );
    } else if (cpuDelta < 0) {
      cpuDeltaIcon = (
        <Label basic floating circular icon="arrow alternate circle down" />
      );
    }

    return (
      <Segment className="no-border">
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <InputFloat
              id="form-input-control-recipient"
              label="CPU"
              name="cpu"
              min={0.0001}
              // max={maxCPUAmount}
              value={cpu}
              onChange={this.handleChange}
              labelPosition="left"
            >
              <Label basic>{bandwidth.cpu_weight}</Label>
              <input />
              {cpuDeltaIcon}
            </InputFloat>
          </Form.Field>
          <Form.Field>
            <InputFloat
              id="form-textarea-control-amount"
              label="Network"
              min={0.0001}
              // max={maxNETAmount}
              name="net"
              value={net}
              onChange={this.handleChange}
              labelPosition="left"
            >
              <Label basic>{bandwidth.net_weight}</Label>
              <input />
              {netDeltaIcon}
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

function assetToFloat(asset) {
  const [amount] = asset.split(' ');
  return parseFloat(amount);
}

function assetToString(asset) {
  const [amount] = asset.split(' ');
  return amount;
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ delegate, undelegate, resetState }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeContainer);
