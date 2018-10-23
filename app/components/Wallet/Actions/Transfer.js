// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Form, List, Grid, Icon } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input';
import TransactionsModal from '../../../components/Shared/TransactionsModal';
import MainContentContainer from './../../../components/Shared/UI/MainContent';
import {
  InputAccount,
  InputFloat
} from '../../../components/Shared/EosComponents';
import { assetToNumber, numberToAsset } from '../../../utils/asset';
import ScrollingTable from '../../Shared/UI/ScrollingTable';
import PermissionButton from '../../Shared/UI/PermissionButton';
import ContactAddModal from '../ContactAddModal';
import ContactRemoveModal from '../ContactRemoveModal';

type Props = {
  currency: {},
  settings: {},
  account: {},
  balances: {},
  contacts: {},
  transaction: {},
  actions: {}
};

const defaultToken = 'EOS';
const defaultContract = 'eosio.token';
const numeral = require('numeral');

export default class Transfer extends Component<Props> {
  constructor(props) {
    super(props);
    const { settings, currency, account } = this.props;
    const pair = _.find(
      currency.exchangePairs,
      el => el.to === settings.exchangeCurrency.toUpperCase()
    );
    this.state = {
      recipient: '',
      amount: '',
      memo: '',
      symbol: defaultToken,
      contract: defaultContract,
      quantity: assetToNumber(account.core_liquid_balance),
      precision: 4,
      step: '0.0001',
      equivalent: 0,
      prefix: pair ? pair.symbol : '',
      openModal: false,
      openAdd: false,
      openRemove: false,
      contact: {}
    };
  }

  componentWillReceiveProps(newProps) {
    const { settings, currency } = newProps;
    const pair = _.find(
      currency.exchangePairs,
      el => el.to === settings.exchangeCurrency.toUpperCase()
    );
    this.setState({ prefix: pair ? pair.symbol : '' });
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
  };

  validateFields = () => {
    const { symbol, recipient, amount } = this.state;
    return (
      symbol !== '' &&
      recipient !== '' &&
      amount !== '' &&
      parseFloat(amount) > 0
    );
  };

  handleContactSelected = (e, { name }) => {
    this.setState({ recipient: name });
  };

  handleChange = (e, { name, value }) => {
    if (name === 'symbol') {
      const [contract, symbol] = value.split('-');
      if (symbol === this.state.symbol) return;
      const { balances, account, currency, settings } = this.props;
      const pair = _.find(
        currency.exchangePairs,
        el => el.to === settings.exchangeCurrency.toUpperCase()
      );
      const token = balances.find(el => el.symbol === symbol);
      const { precision, quantity, step } = token
        ? formatPrecisions(token.amount)
        : formatPrecisions(account.core_liquid_balance);

      this.setState({
        symbol,
        contract,
        quantity,
        precision,
        step,
        amount: '',
        equivalent: 0,
        prefix: pair.symbol
      });
      return;
    }
    if (name === 'amount') {
      const { symbol } = this.state;
      const { currency, settings } = this.props;
      const pair = _.find(
        currency.exchangePairs,
        el => el.to === settings.exchangeCurrency.toUpperCase()
      );
      const equivalent =
        symbol === defaultToken ? pair.value * parseFloat(value) : 0;
      this.setState({ amount: value, equivalent, prefix: pair.symbol });
      return;
    }
    this.setState({ [name]: value });
  };

  handleCurrencyChange = (event, maskedvalue, floatvalue) => {
    if (this.state.symbol !== defaultToken) return;
    const { currency, settings } = this.props;
    const pair = _.find(
      currency.exchangePairs,
      el => el.to === settings.exchangeCurrency.toUpperCase()
    );
    const amount = numeral(floatvalue / pair.value).format('0.0000');
    this.setState({ amount, equivalent: floatvalue, prefix: pair.symbol });
  };

  handleSubmit = () => {
    const { actions, account } = this.props;
    const {
      contract,
      symbol,
      recipient,
      amount,
      memo,
      precision,
      permission
    } = this.state;
    const asset = numberToAsset(amount, symbol.toUpperCase(), precision);
    actions.checkAndRun(
      actions.transfer,
      account.account_name,
      recipient,
      asset,
      memo,
      contract,
      permission
    );
    this.setState({ openModal: true });
  };

  handleClose = () => {
    const { account, actions } = this.props;
    actions.resetState();
    actions.getAccount(account.account_name);

    this.setState({ openModal: false });
  };

  removeContact = contact => {
    this.setState({ openRemove: true, contact });
  };

  addContact = () => {
    this.setState({ openAdd: true });
  };

  handleAddClose = () => {
    this.setState({ openAdd: false });
  };

  handleRemoveClose = () => {
    this.setState({ openRemove: false, contact: {} });
  };

  renderForm = () => {
    const {
      symbol,
      recipient,
      memo,
      amount,
      quantity,
      precision,
      step,
      equivalent,
      prefix,
      openModal
    } = this.state;
    const { account, transaction } = this.props;

    const invalidAmount = parseFloat(amount) > quantity ? 'invalid' : undefined;

    const enableRequest = !invalidAmount && this.validateFields();

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
              prefix={prefix}
              value={equivalent}
              name="equivalent"
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
          maxLength={127}
          placeholder="127 symbols long..."
        />
        <Form.Group id="form-button-control-public">
          <PermissionButton
            account={account}
            content="Transfer"
            disabled={!enableRequest}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
  };

  renderHeader = () => (
    <Grid className="tableheader">
      <Grid.Row textAlign="center">
        <Grid.Column width={16}>
          <p className="tableheadertitle">
            contacts{' '}
            {
              <Icon
                name="add circle"
                onClick={() => this.addContact()}
                style={{ cursor: 'pointer' }}
                className="airdrop-token-add"
              />
            }
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  renderContact = contact => (
    <Grid>
      <Grid.Column width={12}>
        <Grid.Row className="airdrop-token">{contact.title}</Grid.Row>
        <Grid.Row className="airdrop-token">{contact.name}</Grid.Row>
      </Grid.Column>
      <Grid.Column
        width={2}
        verticalAlign="middle"
        onClick={() => this.removeContact(contact)}
        style={{ cursor: 'pointer' }}
        className="airdrop-token-remove"
      >
        <Icon name="times circle outline" />
      </Grid.Column>
    </Grid>
  );

  renderContracts = () => {
    const { contacts, actions } = this.props;
    const { openAdd, openRemove, contact } = this.state;
    return (
      <ScrollingTable
        header={this.renderHeader()}
        content={
          <span>
            <ContactAddModal
              open={openAdd}
              handleClose={this.handleAddClose}
              actions={actions}
            />
            <ContactRemoveModal
              open={openRemove}
              handleClose={this.handleRemoveClose}
              actions={actions}
              contact={contact}
            />
            <List divided style={{ marginBottom: '2em' }} selection>
              {_.map(contacts.list, _contact => (
                <List.Item
                  key={_contact.name}
                  name={_contact.name}
                  onClick={this.handleContactSelected}
                >
                  {this.renderContact(_contact)}
                </List.Item>
              ))}
            </List>
          </span>
        }
      />
    );
  };

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
    );
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
