// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Form, Segment } from 'semantic-ui-react';
import { ModalWindow } from '../../Shared/Modal';

type Props = {
};

export default class Stake extends Component<Props> {
  props: Props;

  state = {
    cpu: 0,
    bandwidth: 0,
    open: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { token, recipient, amount, memo } = this.state;
    const { accounts, actions } = this.props;

    const content = 'Please confirm';
    const modalActions = [{ key: 'cancel', content: 'Cancel', positive: false }, { key: 'confirm', content: 'Confirm', positive: true }];
  }

  render() {
    const { cpu, bandwidth, open } = this.state;

    const content =
      (<Segment className='no-border'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input label='CPU' name='cpu' value={cpu} onChange={this.handleChange} />
            <Form.Input label='Bandwidth' name='bandwidth' value={bandwidth} onChange={this.handleChange} />
          </Form.Group>
          <Form.Button content='Submit' />
        </Form>
        <ModalWindow open={open} />
      </Segment>);

    return (
      <Tab.Pane content={content} className='stake' />
    );
  }
}