// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input';
import TransactionsModal from '../../../components/Shared/TransactionsModal';
import MainContentContainer from './../../../components/Shared/UI/MainContent';
import { InputAccount, InputFloat } from '../../../components/Shared/EosComponents';
import { assetToNumber } from '../../../utils/asset';

type Props = {
  currency: {},
  settings: {},
  account: {},
  balances: {},
  transaction: {},
  actions: {}
};

const defaultToken = 'EOS';
const defaultContract = 'eosio.token';
const numeral = require('numeral');

export default class Transfer extends Component<Props> {
  constructor(props) {
    super(props);
    const { settings, currency , account} = this.props;
    const pair = _.find(currency.exchangePairs, el => el.to === settings.exchangeCurrency.toUpperCase());
    this.state = {
      recipient: '', amount: '', memo: '',
      symbol: defaultToken, 
      contract: defaultContract,
      quantity: assetToNumber(account.core_liquid_balance),
      precision: 4,
      step: '0.0001',
      equivalent: 0,
      preffix: pair ? pair.symbol : '',
      openModal: false,
    };
  }

  tokens = () => {
    const { settings, account } = this.props;
    const tokens = _.map(settings.tokens[account.account_name], elem => ({
        text: elem.symbol,
        value: `${elem.contract}-${elem.symbol}`,
        key: `${elem.contract}-${elem.symbol}`
      }));

    if (!tokens.find(element => element.key === defaultToken)) {
      tokens.splice(0, 0, {
        text: defaultToken,
        value: `${defaultContract}-${defaultToken}`,
        key: `${defaultContract}-${defaultToken}`
      });
    }

    return tokens;
  }

  validateFields = () => {
    const { symbol, recipient, amount } = this.state;
    return symbol !== '' &&
      recipient !== '' &&
      amount !== '' &&
      parseFloat(amount) > 0;
  }

  handleChange = (e, {name, value}) => {
    if (name === 'symbol') {
      const [contract, symbol] = value.split('-');
      if (symbol === this.state.symbol) return;
      const { balances, account, currency, settings } = this.props;
      const pair = _.find(currency.exchangePairs, el => el.to === settings.exchangeCurrency.toUpperCase());
      const token = balances.find(el => el.symbol === symbol);
      const { precision, quantity, step } = token ? 
        formatPrecisions(token.amount) : 
        formatPrecisions(account.core_liquid_balance);

      this.setState({ 
        symbol, 
        contract, 
        quantity, 
        precision, 
        step, 
        amount: '', 
        equivalent: 0, 
        preffix: pair.symbol });
      return;
    }
    if (name === 'amount') {
      const { symbol } = this.state;
      const { currency, settings } = this.props;
      const pair = _.find(currency.exchangePairs, el => el.to === settings.exchangeCurrency.toUpperCase());
      const equivalent = symbol === defaultToken ? pair.value * parseFloat(value) : 0;
      this.setState({ amount: value, equivalent, preffix: pair.symbol });
      return;
    }
    this.setState({[name]: value});
  }

  handleCurrencyChange = (event, maskedvalue, floatvalue) => {
    if (this.state.symbol !== defaultToken) return;
    const { currency, settings } = this.props;
    const pair = _.find(currency.exchangePairs, el => el.to === settings.exchangeCurrency.toUpperCase());
    const amount = numeral(floatvalue / pair.value).format('0.0000');
    this.setState({ amount, equivalent: floatvalue, preffix: pair.symbol });
  }

  handleSubmit = () => {

  }

  handleClose = () => {
    const { account, actions } = this.props;
    actions.resetState();
    actions.getAccount(account.account_name);

    this.setState({ openModal: false });
  };

  renderForm = () => {
    const { symbol, recipient, memo, amount, quantity, precision, step, equivalent, preffix, openModal } = this.state;
    const { account, transaction } = this.props;

    const invalidAmount =
      parseFloat(amount) > quantity ? 'invalid' : undefined;

    const enableRequest = !invalidAmount && this.validateFields();

    const permissions = _.map(account.permissions, el => ({
      key: el.perm_name,
      value: el.perm_name,
      text: `@${el.perm_name}`
    }));

    
    const tokens = this.tokens();

    return (
      <Form onSubmit={this.handleSubmit} className="side-padding">
        <TransactionsModal
          open={openModal}
          transaction={transaction}
          handleClose={this.handleClose}
        />
        <InputAccount
          id="form-input-control-recipient"
          label="Recipient"
          name="recipient"
          value={recipient}
          onChange={this.handleChange}
        />
        <Form.Group widths="equal">
          <InputFloat
            id="form-textarea-control-amount"
            label={invalidAmount ? 'Invalid Amount' : 'Amount'}
            min={0}
            max={Number.MAX_VALUE}
            name="amount"
            step={step}
            precision={precision}
            value={amount}
            className={invalidAmount}
            onChange={this.handleChange}
          >
            <Form.Dropdown
              button
              basic
              floating
              scrolling
              options={tokens}
              defaultValue="EOS"
              name="symbol"
              text={symbol}
              onChange={this.handleChange}
              className="tokendropdown"
            />
            <input />   
            <CurrencyInput 
              id="form-textarea-control-equivalent"
              className="currency-equivalent" 
              prefix={preffix}
              value={equivalent}
              name='equivalent'
              disabled={symbol !== defaultToken}
              onChangeEvent={this.handleCurrencyChange}
            />
          </InputFloat>
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
        <Form.Group id="form-button-control-public">
          <Button.Group>
            <Button content="Transfer" disabled={!enableRequest} />
            <Dropdown
              options={permissions}
              floating
              name="permission"
              button
              className="icon permission"
              disabled={!enableRequest}
              onChange={this.handleChange}
            />
          </Button.Group>
        </Form.Group>
      </Form>      
    )
  }

  renderContracts = () => {

  }

  render() {
    return (
      <MainContentContainer
        title="Transfer funds"
        subtitle="Send your EOS and Airdrop tokens here"
        className="adjust-content"
        content={
          <div className="transfer">
            <div className="transfer-form">{this.renderForm()}</div>
            <div className="transfer-contact-table">
              {this.renderContracts()}
            </div>
          </div>
        }
      />
    )
  }
}

function formatPrecisions(balance) {
  if (!balance) {
    return {
      quantity: 0,
      precision: 4,
      step: '0.0001'
    };
  }
  const [quantity] = balance.split(' ');
  const [, suffix] = quantity.split('.');
  let step = '1';
  for (let i = 1; i < suffix.length; i += 1) {
    step = `0${step}`;
    if (i === suffix.length - 1) {
      step = `0.${step}`;
    }
  }
  return {
    quantity,
    precision: suffix.length,
    step
  };
}

