import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import { InputFloat } from '../../Shared/EosComponents';

type Props = {
  account: {},
  transactions: {},
  buyram: string => {},
  buyrambytes: number => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

const options = [
  { key: 'EOS', value: 'EOS', text: 'EOS' },
  { key: 'bytes', value: 'Bytes', text: 'Bytes' }
];

export default class BuyRam extends Component<Props> {
  state = {
    quantity: 0,
    option: 'EOS',
    openModal: false
  };

  handleChange = (e, { name, value }) => {
    const object = { [name]: value };
    if (name === 'option' && value !== this.state.option) {
      Object.assign(object, { quantity: 0 });
    }
    this.setState(object);
  };

  handleSubmit = () => {
    const { quantity, option } = this.state;

    this.setState({ openModal: true });

    if (option.toLowerCase() === 'eos') {
      this.props.buyram(numberToAsset(quantity));
    } else if (option.toLowerCase() === 'bytes') {
      this.props.buyrambytes(parseInt(quantity, 10));
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
    const { quantity, openModal, option } = this.state;
    let available = assetToNumber(account.core_liquid_balance);
    let step = '0.0001';
    let label = 'Value (EOS)';
    const disabled = quantity === 0;

    if (option.toLowerCase() === 'bytes') {
      available = 0xffffffff;
      step = '1';
      label = 'Value (Bytes)';
    }

    return (
      <div>
        <p className="title">RAM management</p>
        <p className="subtitle">Manage your RAM</p>
        <br />
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleSubmit}>
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
            >
              <Form.Dropdown
                button
                basic
                floating
                options={options}
                defaultValue="EOS"
                name="option"
                text={option}
                onChange={this.handleChange}
                className="tokendropdown"
                style={{ paddingTop: '1em', paddingBottom: '1em' }}
              />
              <input />
            </InputFloat>
          </Form.Group>
          <Form.Button
            id="form-button-control-public"
            content="Confirm"
            disabled={disabled}
          />
        </Form>
      </div>
    );
  }
}
