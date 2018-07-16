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

class SendContainer extends Component<Props> {

  state = {
    token: 'EOS',
    recipient: '',
    amount: '',
    memo: ''
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

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
      amount,
      memo
    } = this.state;

    const tokens = _.map(settings.tokens[accounts.account.account_name], (name) => ({ text: name, value: name, key: name }));
    if (!tokens.find((element) => element.key === 'EOS')) {
      tokens.push({ text: 'EOS', value: 'EOS', key: 'EOS' });
    }

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
            <Form.Input
              id='form-textarea-control-amount'
              label='Amount'
              placeholder='0.00000'
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