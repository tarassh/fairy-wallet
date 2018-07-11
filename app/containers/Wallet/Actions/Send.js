// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { getActions } from '../../../actions/accounts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import History from '../../../components/Wallet/Actions/History';

type Props = {
    history: {},
    accounts: {},
    actions: {}
};

class SendContainer extends Component<Props> {
    props: Props;
    
    getValue = (e, prop) => {    
        prop = e.target.value;
    }
    
    componentDidMount(){
        const {
            actions,
            accounts
        } = this.props;

        const name = accounts.account.account_name;
        actions.getActions(name); 
    }
    
    render() {
        
        return (
            <History />
        );
    }
}
            
function mapStateToProps(state){
      return {
          history: state.actions,
          accounts: state.accounts
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
