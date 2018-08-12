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
// import TransactionsModal from '../../../Shared/TransactionsModal';
// import { numberToAsset, assetToNumber } from '../../../../utils/asset';
import { InputFloat } from '../../../Shared/EosComponents';

type Props = {
  account: {},
  transactions: {}
};

export default class Ram extends Component<Props> {
  state = {
    ram: 0,
    // openModal: false
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { ram } = this.state;

    // this.setState({ openModal: true });
  };

  render() {
    const { ram } = this.state;
    
    return (
      <Segment className="no-border">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <InputFloat
              label="Value (EOS)"
              name="ram"
              step="0.0001"
              min={1.0}
              max={10000000}
              value={ram}
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