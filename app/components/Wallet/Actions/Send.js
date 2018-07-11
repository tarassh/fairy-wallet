// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Form, Input, TextArea, Button, Select, Label, Segment, Dropdown } from 'semantic-ui-react';
import _ from 'lodash'

type Props = {
};

export default class Send extends Component<Props> {
    props: Props;
    
    render() {
        const tokens = [{ text: 'EOS', value: 'EOS' }, { text: 'Shit', value: 'Shit' }, { text: 'Mocha', value: 'Mocha' }];

        const content =
            <Segment className='no-border'>
                <Form>
                    <Form.Group widths='equal'>
                      <Form.Field
                        id='form-input-control-first-name'
                        control={Label}
                        label='Account from'
                      />
                      <Form.Field
                        id='form-input-control-token'
                        control={Select}
                        label='Select token'
                        options={tokens}
                       />
                      <Form.Field
                        id='form-input-control-recipient'
                        control={Input}
                        label='Recipient'
                      />
                    </Form.Group>
                    <Form.Field
                      id='form-textarea-control-amount'
                      control={Input}
                      label='Amount'
                      placeholder='0.00'
                    />
                    <Form.Field
                      id='form-button-control-public'
                      control={TextArea}
                      content='Memo'
                      label='Memo'
                    />
                  <Form.Field
                      id='form-button-control-public'
                      control={Button}
                      content='Confirm'
                      label='Label with htmlFor'
                    />
              </Form>
            </Segment>;
        
        return (
            <Tab.Pane content={content} className='send'/>
        );
    }
}