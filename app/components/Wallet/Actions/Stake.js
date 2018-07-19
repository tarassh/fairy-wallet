// @flow
import React, { Component } from 'react';
import { Input, Label, Form, Segment, Popup, Icon } from 'semantic-ui-react';
import ModalComponent from '../../Shared/Modal';

export default class Stake extends Component<Props> {
  constructor(props) {
		super(props)
		
		const {
			accounts
		} = this.props;

    this.state = {
      cpu: { 
				used: accounts.account.cpu_limit.used,
				max: accounts.account.cpu_limit.max,
				available: accounts.account.cpu_limit.available
			},
      bandwidth: { 
				used: accounts.account.net_limit.used,
				max: accounts.account.net_limit.max,
				available: accounts.account.net_limit.available
			},
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
		const { accounts } = this.props;
    const { cpu, bandwidth } = this.state;

    return (
      <Segment className='no-border'>
        <Form onSubmit={this.handleSubmit} className='stake'>
          <Form.Group>
            <Form.Field> 
              <Input
                name='cpu'
                type='text' 
                value={cpu.used} 
                onChange={this.handleChange} 
                labelPosition='right'
              >
                <Label basic>CPU</Label>
                <input />
                <Label>
                  <Popup
                    trigger={<Icon name='info circle' />}
                    content={`Total: ${cpu.max}\nAvailable: ${cpu.available}`}
                    position='top'
                  />
                </Label>
              </Input>
            </Form.Field>
            <Form.Field> 
              <Input
                name='bandwidth'
                type='text' 
                value={bandwidth.used} 
                onChange={this.handleChange} 
                labelPosition='right'
              >
                <Label basic>Bandwidth</Label>
                <input />
                <Label>
                  <Popup
                    trigger={<Icon name='info circle' />}
                    content={`Total: ${bandwidth.max}\nAvailable: ${bandwidth.available}`}
                    position='top'
                  />
                </Label>
              </Input>
            </Form.Field>
          </Form.Group>
          <Form.Button className='submit' content='Submit' />
        </Form>
        {this.renderModal()}
      </Segment>
    );
  }
}