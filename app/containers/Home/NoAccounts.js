// @flow
import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LedgerActions from '../../actions/ledger';

type Props = {
  accounts: {}
};

class NoAccountsContainer extends Component<Props> {

  onRevealePublicKey = () => {
    this.props.getPublicKey(true);
  }

  render() {
    const { accounts } = this.props;
    const noAccountsText = `Public Key ${accounts.publicKey.wif} doesn't have any registered account. Please create accoгnt for this Public Key.`;

    return (
      <Form>
        <Message
          content={noAccountsText}
        />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...LedgerActions
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NoAccountsContainer)