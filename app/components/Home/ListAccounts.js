// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, List, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

type Props = {
    accounts: {},
    history: {}
};

export class ListAccountsContainer extends Component<Props> {
    props: Props;
    
//    componentDidMount() {
//        const {
//          history
//        } = this.props;
//
//        history.push('/wallet');
//    }

    gotoWallet = () => {
        const {
          history
        } = this.props;
    
        history.push('/wallet');
    }

    render() {
        const {
            accounts
        } = this.props;

        const accountRender = accounts.names.map((account, i) =>                                       
            <List.Item as='a' onClick={this.gotoWallet} key={i}>
              <Icon name='user' />
              <List.Content>
                <List.Description>
                  {account}
                </List.Description>
              </List.Content>
            </List.Item>)
        
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        push: push,
        history: history
    }, dispatch);
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ListAccountsContainer)