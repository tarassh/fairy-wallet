import React, { Component } from 'react';
import {
  Form,
  Segment,
  // Label,
  // Input,
  // Grid,
  // Icon,
  // Divider
} from 'semantic-ui-react';
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
    const { transactions }= this.props;
    const { tokens, openModal } = this.state;
    
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
              max={10000000}
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
            disabled={false}
          />
        </Form>
      </Segment>
    );
  }
}