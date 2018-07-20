// @flow
import React, { Component } from 'react';
import { List, Icon, Form, Button, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { setActiveAccount } from '../../actions/accounts';
import { clearConnection } from '../../actions/connection';

type Props = {
  clearConnection: () => {},
  setActiveAccount: string => {},
  accounts: {},
  history: {}
};

export class ListAccountsContainer extends Component<Props> {
  props: Props;

  onGoBack = () => {
    this.props.clearConnection();
  };

  gotoWallet = (e, { value }) => {
    const { history, accounts } = this.props;

    this.props.setActiveAccount(accounts.names.indexOf(value));
    history.push('/wallet');
  };

  render() {
    const { accounts } = this.props;

    const accountRender = accounts.names.map(account => (
      <List.Item as="a" onClick={this.gotoWallet} key={account} value={account}>
        <Icon name="user" />
        <List.Content>
          <List.Description>{account}</List.Description>
        </List.Content>
      </List.Item>
    ));

    return (
      <Form>
        <Segment>
          <List>{accountRender}</List>
        </Segment>
        <div>
          <Button content="Back" onClick={this.onGoBack} />
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setActiveAccount,
      clearConnection,
      push
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ListAccountsContainer);
