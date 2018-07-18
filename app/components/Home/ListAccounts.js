// @flow
import React, { Component } from 'react';
import { List, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { setActiveAccount } from '../../actions/accounts';

type Props = {
    actions: {},
    accounts: {},
    history: {}
};

export class ListAccountsContainer extends Component<Props> {
    props: Props;

    gotoWallet = (e) => {
        const {
          history,
          actions,
          accounts
        } = this.props;
        
        actions.setActiveAccount(accounts.names.indexOf(e.target.innerText));
        history.push('/wallet');
    }

    render() {
        const {
            accounts
        } = this.props;

        const accountRender = accounts.names.map((account) =>                                       
          (<List.Item as='a' onClick={this.gotoWallet} key={account}>
            <Icon name='user' />
            <List.Content>
              <List.Description>
                {account}
              </List.Description>
            </List.Content>
           </List.Item>))
        
        return (
          <Segment raised>
            <List>
              {accountRender}
            </List>
          </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        setActiveAccount,
        push,
    }, dispatch)
  });

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ListAccountsContainer)