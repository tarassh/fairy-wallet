// @flow
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccounts } from '../../actions/accounts';
import { clearConnection } from '../../actions/connection';
import PublicKeyIcon from '../../components/Shared/PublicKeyIcon';

type Props = {
  accounts: {},
  loading: {},
  getAccounts: () => {},
  clearConnection: () => {}
};

class NoAccountsContainer extends Component<Props> {
  state = {
    copied: false
  };

  onRetry = () => {
    const { accounts } = this.props;
    this.props.getAccounts(accounts.publicKey.wif);
  };

  onCopyKey = copied => {
    this.setState({ copied });
  };

  onGoBack = () => {
    this.props.clearConnection();
  };

  renderFirst = () => {
    const { loading } = this.props;
    const disabled = !!loading.CREATE_CONNECTION;
    const content = (
      <div>
        <p>
          Press key icon to copy public key into clipboard.{' '}
          <PublicKeyIcon callback={this.onCopyKey} />
        </p>
        <br />
        <Button content="Back" disabled={disabled} onClick={this.onGoBack} />
      </div>
    );

    return content;
  };

  renderSecond = () => {
    const { accounts, loading } = this.props;
    const disabled = !!loading.CREATE_CONNECTION;

    const webViewStyle = {
      display: 'inline-flex',
      width: '640px',
      height: '480px',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.15)',
      marginBottom: '1rem'
    };
    const content = (
      <div>
        <div>
          Public key{' '}
          <span className="public-key">{accounts.publicKey.wif}</span> copied.
        </div>
        <br />
        <p>Now use your key to register account.</p>
        <webview
          id="foo"
          src="https://create-eos-account-for.me"
          style={webViewStyle}
        />
        <br />
        <div className="public-key-confirm-modal">
          <Button content="Retry" disabled={disabled} onClick={this.onRetry} />
          <Button content="Back" disabled={disabled} onClick={this.onGoBack} />
        </div>
      </div>
    );

    return content;
  };

  render() {
    const { copied } = this.state;

    return (
      <Form>
        <p className="title">Create Account</p>
        {!copied ? this.renderFirst() : this.renderSecond()}
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

export default connect(mapStateToProps, mapDispatchToProps)(
  NoAccountsContainer
);
