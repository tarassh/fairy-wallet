import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import TransactionsModal from '../../../Shared/TransactionsModal';
import { numberToAsset, assetToNumber } from '../../../../utils/asset';
import { InputFloat } from '../../../Shared/EosComponents';

type Props = {
  account: {},
  transactions: {},
  buyram: string => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

export default class Ram extends Component<Props> {
  state = {
    tokens: 0,
    openModal: false
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { tokens } = this.state;

    this.setState({ openModal: true });
    this.props.buyram(numberToAsset(tokens));
  };

  handleClose = () => {
    const { account } = this.props;

    this.props.resetState();
    this.props.getAccount(account.account_name);
    this.props.getActions(account.account_name);
    this.setState({
      openModal: false,
      tokens: 0
    });
  };

  render() {
    const { transactions, account } = this.props;
    const { tokens, openModal } = this.state;
    const available = assetToNumber(account.core_liquid_balance);
    const disabled = tokens === 0;

    return (
      <Segment className="no-border">
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <InputFloat
              label="Value (EOS)"
              name="tokens"
              step="0.0001"
              min={0}
              max={available}
              value={tokens}
              type="number"
              onChange={this.handleChange}
            >
              <input />
            </InputFloat>
          </Form.Field>
          <Form.Button
            id="form-button-control-public"
            content="Confirm"
            disabled={disabled}
          />
        </Form>
      </Segment>
    );
  }
}
