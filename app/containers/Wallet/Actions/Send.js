// @flow
import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { transfer } from '../../../actions/transaction';

type Props = {
  settings: {},
  accounts: {},
  actions: {}
};

const floatRegExp = new RegExp('^([0-9]+([.][0-9]{0,4})?|[.][0-9]{1,4})$');

const handleValidationOnChange = (e, v, onChange) => {
  const { value, min, max } = v;
  const number = parseFloat(value);
  if (value === '' || (floatRegExp.test(value) && (min <= number && number <= max))) {
    onChange(e, v);
  }
}

const InputFloat = props => {
  if (typeof props.onChange !== 'function') {
    return <Form.Input {...props} />
  }

  const { onChange, ...parentProps } = props

  return (<Form.Input
    {...parentProps}
    onChange={(e, v) => handleValidationOnChange(e, v, onChange)}
  />)
}

class SendContainer extends Component<Props> {

  state = {
    token: 'EOS',
    recipient: '',
    amount: '',
    memo: '',
    resetValue: false
  }

  handleChange = (e, { name, value }) => {
    const resetValue = (name === 'token');
    this.setState({ [name]: value, resetValue })
  };

  handleSubmit = () => {
    const { token, recipient, amount, memo } = this.state
    const { accounts, actions } = this.props;

    actions.transfer(
      accounts.account.account_name,
      recipient,
      `${parseFloat(amount).toFixed(4)} ${token.toUpperCase()}`,
      memo
    );
  }

  render() {
    const {
      accounts,
      settings
    } = this.props;

    const {
      token,
      recipient,
      memo,
      resetValue
    } = this.state;
    let {
      amount
    } = this.state;

    if (resetValue) {
      amount = '';
    }

    const tokens = _.map(settings.tokens[accounts.account.account_name], (name) => ({ text: name, value: name, key: name }));
    if (!tokens.find((element) => element.key === 'EOS')) {
      tokens.push({ text: 'EOS', value: 'EOS', key: 'EOS' });
    }
    if (!accounts.balances.EOS) {
      [accounts.balances.EOS, _] = accounts.account.core_liquid_balance.split(' ');
    }

    const maxAmount = parseFloat(accounts.balances[token]);

    return (
      <Segment className='no-border'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            id='form-input-control-recipient'
            label='Recipient'
            name='recipient'
            value={recipient}
            onChange={this.handleChange}
          />
          <Form.Group widths='equal'>
            <InputFloat
              id='form-textarea-control-amount'
              label='Amount'
              placeholder='0.0000'
              min={0}
              max={maxAmount}
              name='amount'
              value={amount}
              onChange={this.handleChange}
              action={<Form.Dropdown button basic floating options={tokens} defaultValue='EOS' name='token' text={token} onChange={this.handleChange} />}
            />
          </Form.Group>
          <Form.Input
            id='form-button-control-public'
            content='Memo'
            label='Memo'
            name='memo'
            value={memo}
            onChange={this.handleChange}
          />
          <Form.Button
            id='form-button-control-public'
            content='Confirm'
          />
        </Form>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.actions,
    accounts: state.accounts,
    settings: state.settings,
    transaction: state.transaction
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      transfer
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer);