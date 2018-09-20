// @flow
import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TransactionsModal from '../../../components/Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../utils/asset';
import {
  InputAccount,
  InputFloat
} from '../../../components/Shared/EosComponents';
import MainContentContainer from './../../../components/Shared/UI/MainContent';

type Props = {
  settings: {},
  accounts: {},
  transaction: {},
  actions: {}
};

const eosToken = 'EOS';

function formatPrecisions(balance) {
  if (!balance) {
    return {
      precision: 4,
      step: '0.0001'
    };
  }
  const [amount] = balance.split(' ');
  const [, suffix] = amount.split('.');
  let step = '1';
  for (let i = 1; i < suffix.length; i += 1) {
    step = `0${step}`;
    if (i === suffix.length - 1) {
      step = `0.${step}`;
    }
  }
  return {
    precision: suffix.length,
    step
  };
}

class SendContainer extends Component<Props> {
  state = {
    token: eosToken,
    recipient: '',
    amount: '',
    memo: '',
    resetValue: false,
    openModal: false,
    precision: 4,
    permission: ''
  };

  handleClose = () => {
    const { accounts, actions } = this.props;
    actions.resetState();
    actions.getAccount(accounts.account.account_name);

    this.setState({ openModal: false });
  };
  handleChange = (e, { name, value }) => {
    const obj = {
      [name]: value,
      resetValue: false,
      typeError: false,
      inRange: true
    };
    if (name === 'token') {
      const { accounts } = this.props;
      const { balances } = accounts;
      const [contract, symbol] = value.split('-');
      const token = balances.find(el => el.symbol === symbol);

      Object.assign(obj, {
        contract,
        [name]: symbol,
        precision: token ? formatPrecisions(token.amount).precision : 4,
        resetValue: this.state.token !== symbol
      });
    }
    if (name === 'permission') {
      Object.assign(obj, {
        permission: value
      });
    }
    this.setState(obj);
  };

  handleSubmit = () => {
    const { actions, accounts } = this.props;
    const {
      contract,
      token,
      recipient,
      amount,
      memo,
      precision,
      permission
    } = this.state;
    const asset = numberToAsset(amount, token.toUpperCase(), precision);
    const from = accounts.account.account_name;
    actions.checkAndRun(
      actions.transfer,
      from,
      recipient,
      asset,
      memo,
      contract,
      permission
    );
    this.setState({ openModal: true });
  };

  render() {
    const { accounts, settings, transaction } = this.props;
    const { token, recipient, memo, resetValue, openModal } = this.state;

    const { balances, account } = accounts;
    const { amount } = resetValue ? { amount: '' } : this.state;
    const tokens = _.map(settings.tokens[account.account_name], elem => ({
      text: elem.symbol,
      value: `${elem.contract}-${elem.symbol}`,
      key: `${elem.contract}-${elem.symbol}`
    }));

    if (!tokens.find(element => element.key === eosToken)) {
      tokens.splice(0, 0, {
        text: eosToken,
        value: `eosio.token-${eosToken}`,
        key: `eosio.token-${eosToken}`
      });
    }

    let maxAmount = assetToNumber(account.core_liquid_balance);
    let numberFormat = formatPrecisions(account.core_liquid_balance);
    if (token !== eosToken) {
      const t = balances.find(el => el.symbol === token);
      maxAmount = t ? parseFloat(t.amount) : 0;
      numberFormat = formatPrecisions(t.amount);
    }

    const invalidAmount =
      parseFloat(amount) > maxAmount ? 'invalid' : undefined;

    const enableRequest =
      token !== '' &&
      recipient !== '' &&
      amount !== '' &&
      !invalidAmount &&
      parseFloat(amount) > 0;

    const permissions = _.map(account.permissions, el => ({
      key: el.perm_name,
      value: el.perm_name,
      text: `@${el.perm_name}`
    }));

    return (
      <MainContentContainer
        title="Transfer funds"
        subtitle="Send your EOS and Airdrop tokens here"
        className="adjust-content"
        content={
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
                type="number"
                step={numberFormat.step}
                precision={numberFormat.precision}
                value={amount}
                className={invalidAmount}
                onChange={this.handleChange}
              >
                <Form.Dropdown
                  button
                  basic
                  floating
                  options={tokens}
                  defaultValue="EOS"
                  name="token"
                  text={token}
                  onChange={this.handleChange}
                  className="tokendropdown"
                  style={{ paddingTop: '1em', paddingBottom: '1em' }}
                />
                <input />
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
        }
      />
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

export default connect(mapStateToProps, null)(SendContainer);
