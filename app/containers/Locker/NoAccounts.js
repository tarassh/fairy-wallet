// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Form, Button, Icon, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccounts, checkAccountExists } from '../../actions/accounts';
import { clearConnection } from '../../actions/connection';
import PublicKeyIcon from '../../components/Shared/PublicKeyIcon';
import WebViewWrapper from '../../components/Shared/WebViewWrapper';

type Props = {
  accounts: {},
  loading: {},
  getAccounts: () => {},
  checkAccountExists: () => {},
  clearConnection: () => {}
};

class NoAccountsContainer extends Component<Props> {
  constructor() {
    super();
    this.state = {
      copied: false
    };
  }

  componentDidMount(){
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 5000);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.accounts.accountExists) {
      clearInterval(this.interval);
    }
    return true;
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const { accounts } = this.props;
    this.props.checkAccountExists(accounts.publicKey.wif);
  }

  renderSteps = () => {
    const { accountExists } = this.props.accounts;
    const { copied } = this.state;
    return (
      <span>
        <p className="title">Create account steps</p>
        <div className="steps-container">
          <List celled>
            <List.Item
              active={!copied && !accountExists}
              className={copied ? 'visited' : undefined}
            >
              <Icon name="key" />
              <List.Content>
                <List.Header>Get public key</List.Header>
                <p className="subtitle">Click key icon to start</p>
              </List.Content>
            </List.Item>

            <List.Item
              active={copied && !accountExists}
              className={accountExists ? 'visited' : undefined}
            >
              <Icon name="add user" />
              <List.Content>
                <List.Header>Choose account name</List.Header>
                <p className="subtitle">Then proceed to payment</p>
              </List.Content>
            </List.Item>

            <List.Item className={accountExists ? 'visited' : undefined}>
              <Icon name="check circle outline" />
              <List.Content>
                <List.Header>Success</List.Header>
                <p className="subtitle">Now click Login button</p>
              </List.Content>
            </List.Item>
          </List>
        </div>
      </span>
    );
  };

  onLogin = () => {
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
          No account found. You need your public key to create one.<br />Press a
          key icon to get your public key from Ledger Nano S.{' '}
          <PublicKeyIcon callback={this.onCopyKey} />
        </p>
        <br />
        <Button content="Back" disabled={disabled} onClick={this.onGoBack} />
      </div>
    );

    return content;
  };

  renderSecond = () => {
    const { accounts } = this.props;

    const webViewStyle = {
      display: 'inline-flex',
      width: '100%',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.15)'
    };
    const content = (
      <div className="center">
        <div className="header">
          <div>
            Public key&nbsp;
            <span className="public-key">{accounts.publicKey.wif}</span>
          </div>
          <br />
          <p>
            Now choose your account name. Then compare the keys, that we have
            already filled in for you.
          </p>
        </div>
        <WebViewWrapper
          style={webViewStyle}
          accounts={accounts}
          publicKey={accounts.publicKey.wif}
          onLogin={this.onLogin}
          checkAccountExists={this.props.checkAccountExists}
        />
      </div>
    );

    return content;
  };

  render() {
    const { copied } = this.state;

    return (
      <div className="no-account">
        <div className="create-account-steps">{this.renderSteps()}</div>
        <div className="create-account">
          <Form>
            <p className="title">Create Account</p>
            {!copied ? this.renderFirst() : this.renderSecond()}
          </Form>
        </div>
        <div className="take-space">&nbsp;</div>
      </div>
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
      clearConnection,
      checkAccountExists
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  NoAccountsContainer
);
