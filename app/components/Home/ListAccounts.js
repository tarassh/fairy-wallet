// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, List, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

type Props = {
  history: {}
};

export class ListAccountsContainer extends Component<Props> {
    props: Props;
    
    render() {
        const {
            history
        } = this.props;

        gotoWallet = () => {
            history.push('\wallet');
        }

        const accountRender = accounts.map((account, i) =>                                       
            <List.Item as='a' onClick='this.gotoWallet' key={i}>
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
        history: state.history
    }
}

export default connect(mapStateToProps, null)(ListAccountsContainer);