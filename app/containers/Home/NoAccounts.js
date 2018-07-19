// @flow
import React, { Component } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPublicKey } from '../../actions/ledger';
import { getAccounts } from '../../actions/accounts';

type Props = {
  accounts: {},
  loading: {},
  getPublicKey: () => {},
  getAccounts: () => {}
};

class NoAccountsContainer extends Component<Props> {

  onRevealePublicKey = () => {
    this.props.getPublicKey(true);
  }

  onRetry = () => {
    const { accounts } = this.props;
    this.props.getAccounts(accounts.publicKey.wif);
  }

  render() {
    const { accounts, loading } = this.props;
    const noAccountsText = `Public Key ${accounts.publicKey.wif} doesn't have any registered account. Please create account for this Public Key.`;

    let disabled = false;
    if (loading.CREATE_CONNECTION) {
      disabled = true;
    }

    return (
      <Form>
        <Message
          content={noAccountsText}
        />
        <Button 
          content="Retry"
          disabled={disabled}
          primary
          onClick={this.onRetry}
          style={{ marginTop: '1em' }}
        />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPublicKey,
  getAccounts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NoAccountsContainer)