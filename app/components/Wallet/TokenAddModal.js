import _ from 'lodash';
import React, { Component } from 'react';
import {
  Button,
  Message,
  Modal,
  Form,
  Table,
  Transition,
  Divider
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { InputAccount, InputSymbol } from '../Shared/EosComponents';
import { tokenList } from '../Shared/TokenList';

const initialState = {
  symbol: '',
  contract: '',
  typing: false,
  requested: false,
  selectValue: ''
};

const predefinedTokens = _.map(tokenList, el => {
  const key = `${el.account}-${el.symbol}`;
  return { key, value: key, text: el.name, image: el.logo, ...el };
});

type Props = {
  account: {},
  currency: {},
  loading: {},
  actions: {},
  open: boolean,
  handleClose: () => {}
};

class TokenAddModal extends Component<Props> {
  state = initialState;

  checkToken = () => {
    const { actions } = this.props;
    const { symbol, contract } = this.state;
    actions.getCurrencyStats(contract, symbol);
    this.setState({ typing: false, requested: true });
  };
  addToken = () => {
    const { account, handleClose, actions } = this.props;
    const { symbol, contract } = this.state;
    actions.addToken(account.account_name, symbol, contract);
    handleClose();
    this.setState(initialState);
  };
  handleChange = (e, { name, value }) => {
    const newState = { typing: true };
    if (name === 'token') {
      const [contract, symbol] = value.split('-');
      Object.assign(newState, {
        contract: contract.toLowerCase(),
        symbol: symbol.toUpperCase(),
        selectValue: value
      });
    } else {
      const newValue =
        name === 'symbol'
          ? value.trim().toUpperCase()
          : value.trim().toLowerCase();
      Object.assign(newState, { [name]: newValue, selectValue: '' });
    }

    this.setState(newState);
  };
  handleClose = () => {
    if (typeof this.props.handleClose === 'function') {
      this.props.handleClose();
    }
    this.setState(initialState);
  };

  render() {
    const { open, loading, currency } = this.props;
    const { symbol, typing, requested, contract, selectValue } = this.state;
    const token = currency.tokens.find(el => el.symbol === symbol);
    const requesting = !!loading.GET_CURRENCYSTATS;
    const message =
      !requesting && requested && !typing && !token ? (
        <Message error content={`Token ${symbol} not found.`} />
      ) : (
        ''
      );
    const handleClick = requested && !!token ? this.addToken : this.checkToken;
    const content =
      requested && !!token ? (
        <Table basic="very">
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>Issuer</Table.Cell>
              <Table.Cell>{token.stats[symbol].issuer}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Supply</Table.Cell>
              <Table.Cell>{token.stats[symbol].supply}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Maximum Supply</Table.Cell>
              <Table.Cell>{token.stats[symbol].max_supply}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ) : (
        <Form>
          <Form.Select
            placeholder="Select one"
            options={predefinedTokens}
            onChange={this.handleChange}
            name="token"
            label="Select Token"
            value={selectValue}
          />
          <Divider horizontal>
            <h5>Or Add</h5>
          </Divider>
          <Form.Input
            name="contract"
            control={InputAccount}
            value={contract}
            disabled={requesting}
            placeholder="Account..."
            onChange={this.handleChange}
            fluid
            label="Contract Account"
          />
          <Form.Input
            name="symbol"
            control={InputSymbol}
            value={symbol}
            disabled={requesting}
            placeholder="Symbol..."
            onChange={this.handleChange}
            fluid
            label="Token Symbol"
          />
        </Form>
      );

    return (
      <Transition visible={open} animation="scale" duration={200}>
        <Modal open={open} size="mini" onClose={this.onClose}>
          <Modal.Content>
            <Modal.Description>
              {content}
              {message}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              loading={requesting}
              onClick={handleClick}
              disabled={symbol.length === 0}
            >
              Add
            </Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

const mapStateToProps = state => ({
  account: state.accounts.account,
  balances: state.accounts.balances,
  loading: state.loading,
  currency: state.currency
});

export default connect(mapStateToProps, null)(TokenAddModal);
