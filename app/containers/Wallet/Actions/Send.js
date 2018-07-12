// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
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
    props: Props;
    
    getValue = (e, prop) => {    
        prop = e.target.value;
    }
    
    componentDidMount(){
    }
    
    render() {
        const {
            accounts,
            settings
        } = this.props;
        
        const tokens = _.map(settings.tokens, (token) => {
            let tokens = [];
            tokens.concat({ text: token, value: token });
            return tokens;
        });
        
        return (
            <Segment className='no-border'>
                <Form>
                    <Form.Group widths='equal'>
                      <Form.Field
                        id='form-input-control-first-name'
                        control={Label}
                        label='Account from'
                        value={accounts.account_name}
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
