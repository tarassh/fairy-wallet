// @flow
import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { transfer } from '../../../actions/transaction';
import TransactionModal from '../../../components/Shared/TransactionModal';

type Props = {
  settings: {},
  accounts: {},
  transaction: {},
  transfer: (string, string, string, string) => {}
};

type inputProps = {
  onChange: () => {}
};

const eosToken = 'EOS';

const floatRegExp = new RegExp('^([0-9]+([.][0-9]{0,4})?|[.][0-9]{1,4})$');

const handleFloatInputValidationOnChange = (e, v, onChange) => {
  const { value, min, max } = v;
  const number = parseFloat(value);
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

const accountNameRegExp = new RegExp('^[a-z12345.]{1,12}$');

const handleAccountNameInputValidationOnChange = (e, v, onChange) => {
  const { value } = v;
  if (value === '' || accountNameRegExp.test(value)) {
    onChange(e, v);
  }
};

const InputAccountName = (props: inputProps) => {
  if (typeof props.onChange !== 'function') {
    return <Form.Input {...props} />;
  }

  const { onChange, ...parentProps } = props;

  return (
    <Form.Input
      {...parentProps}
      onChange={(e, v) =>
        handleAccountNameInputValidationOnChange(e, v, onChange)
      }
    />
  );
};

class SendContainer extends Component<Props> {
  state = {
    token: eosToken,
    recipient: '',
    amount: '',
    memo: '',
    resetValue: false,
    openModal: false
  };

  handleClose = () => this.setState({ openModal: false });
  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value, resetValue: name === 'token' });
  handleSubmit = () => {
    const { token, recipient, amount, memo } = this.state;
    const { accounts } = this.props;
    const accountName = accounts.account.account_name;
    const asset = `${parseFloat(amount).toFixed(4)} ${token.toUpperCase()}`;

    this.props.transfer(accountName, recipient, asset, memo);
    this.setState({ openModal: true });
  };

  render() {
    const { accounts, settings, transaction } = this.props;
    const { token, recipient, memo, resetValue, openModal } = this.state;

    const { balances, account } = accounts;
    const { amount } = resetValue ? { amount: '' } : this.state;
    const tokens = _.map(settings.tokens[account.account_name], name => ({
      text: name,
      value: name,
      key: name
    }));

    if (!tokens.find(element => element.key === eosToken)) {
      tokens.push({ text: eosToken, value: eosToken, key: eosToken });
    }
    if (!balances.EOS) {
      [balances.EOS, _] = account.core_liquid_balance.split(' ');
    }

    const maxAmount = parseFloat(balances[token]);
    const enableRequest = token !== '' && recipient !== '' && amount !== '';
    const context = enableRequest
      ? {
          contract: 'eosio.token',
          action: 'transfer',
          data: [
            'from',
            account.account_name,
            'to',
            recipient,
            `${parseFloat(amount).toFixed(4)} ${token.toUpperCase()}`
          ].join(' '),
          memo
        }
      : null;
    const txContext = Object.assign(
      {},
      {
        context,
        receipt: transaction.tx,
        error: transaction.err
      }
    );

    return (
      <Segment className="no-border">
        <TransactionModal
          open={openModal}
          transaction={txContext}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleSubmit}>
          <InputAccountName
            id="form-input-control-recipient"
            label="Recipient"
            name="recipient"
            value={recipient}
            onChange={this.handleChange}
          />
          <Form.Group widths="equal">
            <InputFloat
              id="form-textarea-control-amount"
              label="Amount"
              placeholder="0.0000"
              min={0}
              max={maxAmount}
              name="amount"
              value={amount}
              onChange={this.handleChange}
              action={
                <Form.Dropdown
                  button
                  basic
                  floating
                  options={tokens}
                  defaultValue="EOS"
                  name="token"
                  text={token}
                  onChange={this.handleChange}
                />
              }
              actionPosition="left"
            />
          </Form.Group>
          <Form.Input
            id="form-button-control-public"
            content="Memo"
            label="Memo"
            name="memo"
            value={memo}
            onChange={this.handleChange}
            maxLength={80}
            placeholder="80 symbols long..."
          />
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

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings,
    transaction: state.transaction
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ transfer }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendContainer);
