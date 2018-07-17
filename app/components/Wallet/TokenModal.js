import React, { Component } from 'react';
import { Button, Message, Modal, Input, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';

const initialState = {
  tokenSymbol: '',
  typing: false,
  requested: false
}

class TokenModal extends Component<Props> {
  state = initialState;

  checkToken = () => {
    const {
      tokenSymbol
    } = this.state;
    this.props.actions.getCurrencyStats('eosio.token', tokenSymbol);
    this.setState({ typing: false, requested: true });
  }
  addToken = () => {
    const { account, handleClose } = this.props;
    const { tokenSymbol } = this.state;
    this.props.actions.addToken(account.account_name, tokenSymbol);
    handleClose();
    this.setState(initialState);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value.trim().toUpperCase(), typing: name === 'tokenSymbol' });
  handleClose = () => {
    if (typeof this.props.handleClose === 'function') {
      this.props.handleClose();
    }
    this.setState(initialState);
  }

  render() {
    const {
      open,
      loading,
      currency,
    } = this.props;
    const { tokenSymbol, typing, requested } = this.state;
    const token = currency.tokens.find((el) => el.symbol === tokenSymbol);
    const requesting = !!loading.GET_CURRENCYSTATS;
    const message = (requested && !typing && !token) ? (<Message
      error
      content={`Token ${tokenSymbol.toUpperCase()} not found.`}
    />) : '';
    const handleClick = (requested && !!token) ? this.addToken : this.checkToken;
    const content = (requested && !!token) ? (
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}>
              Issuer
            </Table.Cell>
            <Table.Cell>
              {token.stats[tokenSymbol].issuer}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Supply
            </Table.Cell>
            <Table.Cell>
              {token.stats[tokenSymbol].supply}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Maximum Supply
            </Table.Cell>
            <Table.Cell>
              {token.stats[tokenSymbol].max_supply}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ) : (
      <Input
        name='tokenSymbol'
        value={tokenSymbol}
        disabled={requesting}
        placeholder='Token name...'
        onChange={this.handleChange}
      />
      );

    return (
      <Modal
        open={open}
        size='tiny'
        onClose={this.onClose}
      >
        <Modal.Content>
          <Modal.Description>
            {content}
            {message}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary loading={requesting} onClick={handleClick}>Add</Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  account: state.accounts.account,
  balances: state.accounts.balances,
  loading: state.loading,
  currency: state.currency
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addToken,
    getCurrencyStats
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenModal);