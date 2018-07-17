// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Label, Table, Segment, Modal, Button, Input, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';

type Props = {
  accounts: {},
  actions: {},
  loading: {},
  currency: {}
};

class Balance extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      modalOpen: false,
      tokenChanged: false
    }
  }

  componentDidUpdate() {
    const {
      loading,
      currency,
      accounts
    } = this.props;

    const { token, modalOpen } = this.state;
    const { tokens } = currency;
    const { account_name } = accounts.account;

    if (modalOpen && loading.GET_CURRENCYSTATS === false) {
      if (tokens.find((el) => el.symbol === token.toUpperCase()) && !accounts.balances[account_name]) {
        this.props.actions.addToken(account_name, token);
        this.handleClose();
      }
    }
  }


  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  handleChange = (e, { name, value }) => this.setState({ [name]: value, tokenChanged: name === 'token' });

  getCurrency = () => {
    const {
      token
    } = this.state;
    this.props.actions.getCurrencyStats('eosio.token', token);
    this.setState({ tokenChanged: false });
  }

  render() {
    const {
      accounts,
      loading,
      currency
    } = this.props;

    const { token, tokenChanged } = this.state;
    const staked = `${parseFloat(accounts.account.voter_info.staked / 10000).toFixed(4)} EOS`;

    const requested = !!loading.GET_CURRENCYSTATS;
    let message = '';
    const { tokens } = currency;

    if (!tokenChanged &&
      loading.GET_CURRENCYSTATS === false &&
      !tokens.find((el) => el.symbol === token.toUpperCase())
    ) {
      message = (<Message
        error
        content={`Token ${token.toUpperCase()} not found.`}
      />);
    }

    return (
      <Segment.Group className='no-border no-padding'>
        <Segment>
          <Label>
            Account
            <Label.Detail>
              {accounts.account.account_name}
            </Label.Detail>
          </Label>
        </Segment>
        <Segment>
          <Label>
            Balance
            <Label.Detail>
              Staked/Delegated {staked}
            </Label.Detail>
            <Label.Detail>
              Liquid {accounts.account.core_liquid_balance}
            </Label.Detail>
          </Label>
        </Segment>
        <Segment>
          <Modal size='tiny' open={this.state.modalOpen} trigger={<Button fluid onClick={this.handleOpen}>Add new token</Button>}>
            <Modal.Content>
              <Modal.Description>
                <Input
                  name='token'
                  value={token}
                  disabled={requested}
                  placeholder='Token name...'
                  onChange={this.handleChange}
                />
                {message}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button basic loading={requested} onClick={this.getCurrency}>Add</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Actions>
          </Modal>
        </Segment>
        <Segment>
          <Table celled basic='very' compact='very' unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Token
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Balance
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(accounts.balances, (balance, currency) => (
                <Table.Row key={currency}>
                  <Table.Cell collapsing>{currency}</Table.Cell>
                  <Table.Cell collapsing>{balance}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  currency: state.currency
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addToken,
    getCurrencyStats
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Balance);