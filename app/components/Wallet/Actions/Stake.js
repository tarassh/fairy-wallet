// @flow
import React, { Component } from 'react';
import { Tab, Form, Segment } from 'semantic-ui-react';
import ModalComponent from '../../Shared/Modal';

export default class Stake extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      cpu: 0,
      bandwidth: 0,
      open: false,
      content: '',
      actions: []
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  onActionClick = (event, data) => {
      this.setState({ open: false });
  };

  renderModal = () => {
    const {open, content, actions} = this.state;
    return <ModalComponent open={open} content={content} actions={actions} onActionClick={this.onActionClick} />;
  };

  handleSubmit = () => {
    this.setState({ open: true, content: 'Please confirm', actions: [{ key: 'cancel', content: 'Cancel', positive: false }, { key: 'confirm', content: 'Confirm', positive: true }], closable: true });
  };

  render() {
    const { cpu, bandwidth } = this.state;

    return (
      <Segment className='no-border'>
        <Form onSubmit={this.handleSubmit} className='stake'>
          <Form.Group>
            <Form.Input label='CPU' name='cpu' value={cpu} onChange={this.handleChange} />
            <Form.Input label='Bandwidth' name='bandwidth' value={bandwidth} onChange={this.handleChange} />
          </Form.Group>
          <Form.Button className='submit' content='Submit' />
        </Form>
        {this.renderModal()}
      </Segment>
    );
  }
}