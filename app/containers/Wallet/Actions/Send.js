// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form, Segment, Label, Select, Input, TextArea, Button } from 'semantic-ui-react';
import { getActions } from '../../../actions/accounts';
import { transfer } from '../../../actions/transaction';
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
        token: 'EOS',
        recipient: '',
        amount: '',
        memo: '',
        submittedToken: '',
        submittedRecipient: '',
        submittedAmount: '',
        submittedMemo: ''
    }
    
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { token, recipient, amount, memo } = this.state
        const { accounts, actions } = this.props;

        this.setState({ 
            submittedToken: token,
            submittedRecipient: recipient, 
            submittedAmount: amount,
            submittedMemo: memo    
        })
        
        actions.transfer(
            accounts.account.account_name, 
            recipient, 
            (new Number(amount)).toFixed(2) + ' ' + token.toUpperCase(), 
            memo
        );
    }

    componentDidMount(){
    }
    
    render() {
        const {
            accounts,
            settings
        } = this.props;
        
        const {
            token,
            recipient,
            amount,
            memo,
            submittedToken,
            submittedRecipient,
            submittedAmount,
            submittedMemo
        } = this.state;

        
        const tokens = _.map(settings.tokens[accounts.account.account_name], (token) => ({ text: token, value: token, key: token }));

        return (
            <Segment className='no-border'>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        id='form-input-control-recipient'
                        label='Recipient'
                        name='recipient'
                        value={recipient}
                        onChange={this.handleChange}
                    />
                    <Form.Group widths='equal'>
                        <Form.Input
                            id='form-textarea-control-amount'
                            label='Amount'
                            placeholder='0.00'
                            name='amount'
                            value={amount}
                            onChange={this.handleChange}
                        />
                        <Form.Dropdown
                            id='form-input-control-token'
                            label='Select token'
                            name='token'
                            options={tokens}
                            text={token}
                            defaultValue='EOS'
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.TextArea
                        id='form-button-control-public'
                        content='Memo'
                        label='Memo'
                        name='memo'
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
            getActions: getActions,
            transfer: transfer
        }, dispatch)       
    };  
}

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer);
