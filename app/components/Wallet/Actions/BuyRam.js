import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import { InputFloat, InputAccount } from '../../Shared/EosComponents';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

export default class BuyRam extends Component<Props> {
  state = {
    quantity: 0,
    option: 'eos',
    openModal: false,
    recipient: '',
  };

  handleChange = (e, { name, value }) => {
    const object = { [name]: value };
    if (name === 'option' && value !== this.state.option) {
      Object.assign(object, { quantity: 0 });
    }
    this.setState(object);
  };

  handleExecute = () => {
    const { quantity, option, recipient } = this.state;
    const { actions } = this.props;

    if (option.toLowerCase() === 'eos') {
      actions.buyram(recipient, numberToAsset(quantity));
    } else if (option.toLowerCase() === 'bytes') {
      actions.buyrambytes(recipient, parseInt(quantity, 10));
    }
  }

  handleSubmit = () => this.setState({ openModal: true })

  handleClose = () => {
    const { account, actions } = this.props;

    actions.resetState();
    actions.getAccount(account.account_name);
    actions.getActions(account.account_name);
    this.setState({
      openModal: false,
      quantity: 0
    });
  };

  render() {
    const { transaction, account } = this.props;
    const { quantity, openModal, option, recipient } = this.state;
    let available = assetToNumber(account.core_liquid_balance);
    let step = '0.0001';
    let label = 'Value (EOS)';
    let invalidAmount;
    let disabled = quantity === 0 || recipient === '' || quantity === '';

    const units = option.toLowerCase();
    if (units === 'bytes') {
      available = 0xffffffff;
      step = '1';
      label = 'Value (Bytes)';
    } else if (quantity > available) {
      invalidAmount = 'invalid';
      label = 'Invalid Amount';
      disabled = true;
    }

    return (
      <div>
        <TransactionsModal
          open={openModal}
          transaction={transaction}
          handleClose={this.handleClose}
          handleExecute={this.handleExecute}
        />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <InputAccount
              id="form-input-control-recipient"
              label="Recipient"
              name="recipient"
              value={recipient}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputFloat
              label={label}
              name="quantity"
              step={step}
              min={0}
              max={Number.MAX_VALUE}
              value={quantity}
              type="number"
              className={invalidAmount}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>Units</label>
            <Form.Field
              control={Radio}
              label='EOS'
              name='option'
              value='eos'
              checked={this.state.option === 'eos'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='Bytes'
              value='bytes'
              name='option'
              checked={this.state.option === 'bytes'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button
            id="form-button-control-public"
            content="Buy Ram"
            disabled={disabled}
          />
        </Form>
      </div>
    );
  }
}
