// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form, Segment, Label, Select, Input, TextArea, Button } from 'semantic-ui-react';
import { getActions } from '../../../actions/accounts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

type Props = {
    settings: {},
    accounts: {},
    actions: {}
};

class SendContainer extends Component<Props> {
    constructor(props) {
        super(props);
    }
    state = {
            recipient: '',
            amount: '',
            memo: '',
            submittedRecipient: '',
            submittedAmount: '',
            submittedMemo: ''
        }
    
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { recipient, amount, memo } = this.state

        this.setState({ 
            submittedRecipient: recipient, 
            submittedAmount: amount,
            submittedMemo: memo    
        })
    }

    componentDidMount(){
    }
    
    render() {
        const {
            accounts,
            settings
        } = this.props;
        
        const {
            recipient,
            amount,
            memo,
            submittedRecipient,
            submittedAmount,
            submittedMemo
        } = this.state;

        
        const tokens = _.map(settings.tokens[accounts.account.account_name], (token) => ({ text: token, value: token, key: token }));

//        let tokens = [];
//        _.map(settings.tokens[accounts.account.account_name], (token) => {
//          tokens.push({ text: token, value: token, key: token });
//        });

        return (
            <Segment className='no-border'>
                <Form>
                    <Form.Input
                        id='form-input-control-recipient'
                        label='Recipient'
                        value={recipient}
                        onChange={this.handleChange}
                    />
                    <Form.Group widths='equal'>
                        <Form.Input
                            id='form-textarea-control-amount'
                            label='Amount'
                            placeholder='0.00'
                            value={amount}
                            onChange={this.handleChange}
                        />
                        <Form.Dropdown
                            id='form-input-control-token'
                            label='Select token'
                            options={tokens}
//                            defaultValue={['EOS']}
                        />
                    </Form.Group>
                    <Form.TextArea
                        id='form-button-control-public'
                        content='Memo'
                        label='Memo'
                        value={memo}
                        onChange={this.handleChange}
                    />
                    <Form.Button
                        id='form-button-control-public'
                        content='Confirm'
                    />
                </Form>
            </Segment>
        );
    }
}
            
function mapStateToProps(state){
      return {
          history: state.actions,
          accounts: state.accounts,
          settings: state.settings
      }      
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators({
            getActions: getActions
        }, dispatch)       
    };  
}

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer);
