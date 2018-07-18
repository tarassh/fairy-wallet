// @flow
import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Tab, Form, Segment } from 'semantic-ui-react';
import Confirm from '../../Shared/Confirm';

type Props = {

};

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

  handleSubmit = () => {
    this.setState({ open: true, content: 'Please confirm', actions: [{ key: 'cancel', content: 'Cancel', positive: false }, { key: 'confirm', content: 'Confirm', positive: true }], closable: true });
  };

  render() {
    const { cpu, bandwidth, open, content, actions, closable } = this.state;

    const tabContent = (
      <Segment className='no-border'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input label='CPU' name='cpu' value={cpu} onChange={this.handleChange} />
            <Form.Input label='Bandwidth' name='bandwidth' value={bandwidth} onChange={this.handleChange} />
          </Form.Group>
          <Form.Button content='Submit' />
        </Form>
        <Confirm open={open} content={content} actions={actions} closable={closable} />
      </Segment>
    );

    return (
      <Tab.Pane content={tabContent} className='stake' />
    );
  }
}