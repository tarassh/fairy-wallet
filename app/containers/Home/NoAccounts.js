// @flow
import React, { Component } from 'react';
import { Button, Container, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPublicKey } from '../../actions/ledger';

type Props = {
    accounts: {}
};

class NoAccountsContainer extends Component<Props> {

  onRevealePublicKey = () => this.getPublicKey(true)

  render() {
      const { accounts } = this.props;
      const noAccountsText = `Public Key ${  accounts.publicKey.wif  } doesn't have any registered account.`;
    return (
      <Form>
        <h2>{noAccountsText}</h2>
        <h2>Please create accont for this Public Key</h2>
        <Container textAlign="center">
          <Button
            content="Verify Key With Ledger"
            icon="verify"
            primary
            onClick={this.onRevealePublicKey}
            style={{ marginTop: '1em' }}
          />
        </Container>
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
    ...getPublicKey
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NoAccountsContainer)