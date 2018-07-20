// @flow
import React, { Component } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccounts } from '../../actions/accounts';
import { clearConnection } from '../../actions/connection';
import PublicKeyComponent from '../../components/Shared/PublicKeyComponent';

type Props = {
  accounts: {},
  loading: {},
  getAccounts: () => {},
  clearConnection: () => {}
};

class NoAccountsContainer extends Component<Props> {
  onRetry = () => {
    const { accounts } = this.props;
    this.props.getAccounts(accounts.publicKey.wif);
  };

  onGoBack = () => {
    this.props.clearConnection();
  };

  render() {
    const { loading } = this.props;
    const disabled = !!loading.CREATE_CONNECTION;

    return (
      <Form>
        <Message>
          <Message.Content>
            <p>Public Key </p>
            <PublicKeyComponent />
            <p>
              do not have any registered account. Please create account for this
              Public Key.
            </p>
          </Message.Content>
        </Message>
        <div>
          <Button
            content="Retry"
            disabled={disabled}
            primary
            onClick={this.onRetry}
            style={{ marginTop: '1em' }}
          />
          <Button content="Back" disabled={disabled} onClick={this.onGoBack} />
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAccounts,
      clearConnection
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoAccountsContainer);
