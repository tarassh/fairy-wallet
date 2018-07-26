import React, { Component } from 'react';
import {
  Button,
  Message,
  Modal,
  Form,
  Input,
  Table,
  Transition
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';

const initialState = {
  tokenSymbol: '',
  contract: '',
  typing: false,
  requested: false
};

class TokenAddModal extends Component<Props> {
  state = initialState;

  checkToken = () => {
    const { tokenSymbol, contract } = this.state;
    this.props.actions.getCurrencyStats(contract, tokenSymbol);
    this.setState({ typing: false, requested: true });
  };
  addToken = () => {
    const { account, handleClose } = this.props;
    const { tokenSymbol, contract } = this.state;
    this.props.actions.addToken(account.account_name, tokenSymbol, contract);
    handleClose();
    this.setState(initialState);
  };
  handleChange = (e, { name, value }) => {
    const newValue = name === 'tokenSymbol' ? value.trim().toUpperCase() : value.trim().toLowerCase();
    this.setState({
      [name]: newValue,
      typing: true
    });
  }
  handleClose = () => {
    if (typeof this.props.handleClose === 'function') {
      this.props.handleClose();
    }
    this.setState(initialState);
  };

  render() {
    const { open, loading, currency } = this.props;
    const { tokenSymbol, typing, requested, contract } = this.state;
    const token = currency.tokens.find(el => el.symbol === tokenSymbol);
    const requesting = !!loading.GET_CURRENCYSTATS;
    const message =
      !requesting && requested && !typing && !token ? (
        <Message
          error
          content={`Token ${tokenSymbol.toUpperCase()} not found.`}
        />
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
              <Table.Cell>{token.stats[tokenSymbol].issuer}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Supply</Table.Cell>
              <Table.Cell>{token.stats[tokenSymbol].supply}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Maximum Supply</Table.Cell>
              <Table.Cell>{token.stats[tokenSymbol].max_supply}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ) : (
        <Form>
          <Input
            autoFocus
            name="contract"
            value={contract}
            disabled={requesting}
            placeholder="Contract name..."
            onChange={this.handleChange}
            fluid 
          />
          <Input          
            name="tokenSymbol"
            value={tokenSymbol}
            disabled={requesting}
            placeholder="Token name..."
            onChange={this.handleChange}
            fluid
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
              disabled={tokenSymbol.length === 0}
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
