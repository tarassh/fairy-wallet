import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import { InputFloat, InputAccount } from '../../Shared/EosComponents';

type Props = {
  account: {},
  transactions: {},
  buyram: string => {},
  buyrambytes: number => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
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

  handleSubmit = () => {
    const { quantity, option, recipient } = this.state;

    this.setState({ openModal: true });

    if (option.toLowerCase() === 'eos') {
      this.props.buyram(recipient, numberToAsset(quantity));
    } else if (option.toLowerCase() === 'bytes') {
      this.props.buyrambytes(recipient, parseInt(quantity, 10));
    }
  };

  handleClose = () => {
    const { account } = this.props;

    this.props.resetState();
    this.props.getAccount(account.account_name);
    this.props.getActions(account.account_name);
    this.setState({
      openModal: false,
      quantity: 0
    });
  };

  render() {
    const { transactions, account } = this.props;
    const { quantity, openModal, option, recipient } = this.state;
    let available = assetToNumber(account.core_liquid_balance);
    let step = '0.0001';
    let label = 'Value (EOS)';
    const disabled = quantity === 0 || recipient === '';

    if (option.toLowerCase() === 'bytes') {
      available = 0xffffffff;
      step = '1';
      label = 'Value (Bytes)';
    }

    return (
      <div>
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
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
              max={available}
              value={quantity}
              type="number"
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
