import React, { Component } from 'react';
import {
  Button,
  Message,
  Modal,
  Form,
  Table,
  Transition
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';
import { InputAccount, InputSymbol } from '../Shared/EosComponents';

const initialState = {
  symbol: '',
  contract: '',
  typing: false,
  requested: false,
  selectValue: ''
};

const predefinedTokens = [
  { key: 'everipediaiq-iq', value: 'everipediaiq-iq', text: 'Everipedia (IQ)' },
  {
    key: 'therealkarma-karma',
    value: 'therealkarma-karma',
    text: 'Karma (KARMA)'
  },
  {
    key: 'challengedac-chl',
    value: 'challengedac-chl',
    text: 'Challenge (CHL)'
  },
  {
    key: 'horustokenio-horus',
    value: 'horustokenio-horus',
    text: 'Horus (HORUS)'
  }
];

class TokenAddModal extends Component<Props> {
  state = initialState;

  checkToken = () => {
    const { symbol, contract } = this.state;
    this.props.actions.getCurrencyStats(contract, symbol);
    this.setState({ typing: false, requested: true });
  };
  addToken = () => {
    const { account, handleClose } = this.props;
    const { symbol, contract } = this.state;
    this.props.actions.addToken(account.account_name, symbol, contract);
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
          <Form.Input
            autoFocus
            name="contract"
            control={InputAccount}
            value={contract}
            disabled={requesting}
            placeholder="Contract name..."
            onChange={this.handleChange}
            fluid
          />
          <Form.Input
            name="symbol"
            control={InputSymbol}
            value={symbol}
            disabled={requesting}
            placeholder="Token name..."
            onChange={this.handleChange}
            fluid
          />
          <Form.Select
            placeholder="... or select one"
            options={predefinedTokens}
            onChange={this.handleChange}
            name="token"
            value={selectValue}
          />
        </Form>
      );

    return (
      <Transition visible={open} animation="scale" duration={500}>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addToken,
      getCurrencyStats
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenAddModal);
