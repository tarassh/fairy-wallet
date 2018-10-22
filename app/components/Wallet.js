// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { Menu, Icon, Modal, Button, Label } from 'semantic-ui-react';
import WalletActions from './Wallet/Actions';
import BalanceComponent from '../components/Shared/BalanceComponent';
import AccountComponent from '../components/Shared/AccountComponent';
import FairyContainer from '../components/Shared/UI/FairyContainer';
import styles from './Wallet.css'; // eslint-disable-line no-unused-vars
import Tokens from './Wallet/Tokens';
import StakedStats from './Wallet/StakedStats';
import UtilityStats from './Shared/UtilityStats';
import RamStats from './Wallet/RamStats';

type Props = {
  states: {},
  accounts: {},
  history: {},
  currency: {},
  loading: {},
  failure: {},
  actions: {},
  settings: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  state = {
    activeItem: 'history',
    lastActionBlock: 0,
    showNotification: false
  };

  componentWillReceiveProps(newProps) {
    const { activeItem, lastActionBlock } = this.state;
    const { accounts } = newProps;

    if (
      lastActionBlock !== accounts.lastActionBlock &&
      activeItem !== 'history'
    ) {
      this.setState({ showNotification: true });
    }

    if (activeItem === 'history') {
      this.setState({ lastActionBlock: accounts.lastActionBlock });
    }
  }

  componentDidUpdate() {
    const { states, history } = this.props;
    if (!states.deviceConnected) {
      history.goBack();
    }
  }

  handleItemClick = (e, { name }) => {
    if (name === 'history') {
      const { accounts } = this.props;
      this.setState({
        activeItem: name,
        showNotification: false,
        lastActionBlock: accounts.lastActionBlock
      });
    } else {
      this.setState({ activeItem: name });
    }
  };

  handleRetry = () => {
    const { accounts, actions } = this.props;
    actions.getAccount(accounts.names[accounts.activeAccount]);
  };

  handleChangeNode = () => {
    const { history, actions } = this.props;
    actions.clearConnection();
    history.goBack();
  };

  renderContent = action => (
    <div>
      <p className="title">Connection error!</p>
      <br />
      <br />
      <div>
        <div className="subtitle no-top-bottom-margin">
          Please retry or change node...
        </div>
      </div>
      <br />
      <br />
      <div className="public-key-confirm-modal">{action}</div>
    </div>
  );

  render() {
    const {
      accounts,
      currency,
      loading,
      failure,
      actions,
      settings
    } = this.props;
    const { activeItem, showNotification } = this.state;
    const newAction = showNotification ? (
      <Label basic content="new" className="notification" />
    ) : (
      undefined
    );

    const subpanes = {
      history: <Tokens accounts={accounts} actions={actions} />,
      transfer: <Tokens accounts={accounts} actions={actions} />,
      voting: <Tokens accounts={accounts} actions={actions} />,
      delegate: (
        <StakedStats
          account={accounts.account}
          delegates={accounts.delegates}
          delegatee={accounts.delegatee}
        />
      ),
      undelegate: (
        <StakedStats
          account={accounts.account}
          delegates={accounts.delegates}
          delegatee={accounts.delegatee}
        />
      ),
      ram: <RamStats account={accounts.account} />
    };

    const actionMenu = (
      <Menu text vertical>
        <Menu.Item
          name="history"
          active={activeItem === 'history'}
          onClick={this.handleItemClick}
        >
          <Icon name="history" />
          HISTORY{newAction}
        </Menu.Item>
        <Menu.Item
          name="transfer"
          active={activeItem === 'transfer'}
          onClick={this.handleItemClick}
        >
          <Icon name="send" />
          TRANSFER
        </Menu.Item>
        <Menu.Item
          name="delegate"
          active={activeItem === 'delegate'}
          onClick={this.handleItemClick}
        >
          <Icon name="chevron circle right" />
          DELEGATE
        </Menu.Item>
        <Menu.Item
          name="undelegate"
          active={activeItem === 'undelegate'}
          onClick={this.handleItemClick}
        >
          <Icon name="chevron circle left" />
          UNDELEGATE
        </Menu.Item>
        <Menu.Item
          name="refund"
          active={activeItem === 'refund'}
          onClick={this.handleItemClick}
        >
          <Icon name="redo" />
          REFUND
        </Menu.Item>
        <Menu.Item
          name="ram"
          active={activeItem === 'ram'}
          onClick={this.handleItemClick}
        >
          <Icon name="microchip" />
          RAM
        </Menu.Item>
        <Menu.Item
          name="voting"
          active={activeItem === 'voting'}
          onClick={this.handleItemClick}
        >
          <Icon name="signup" />
          VOTING
        </Menu.Item>
        <Menu.Item
          name="permissions"
          active={activeItem === 'permissions'}
          onClick={this.handleItemClick}
        >
          <Icon name="list" />
          PERMISSIONS
        </Menu.Item>
        <Menu.Item
          name="settings"
          active={activeItem === 'settings'}
          onClick={this.handleItemClick}
          className="settings"
        >
          <Icon name="setting" />
          SETTINGS
        </Menu.Item>
      </Menu>
    );

    let isLoading = false;
    _.forEach(loading, value => {
      if (value === true) {
        isLoading = true;
        return false;
      }
    });

    const buttons = [
      <Button onClick={this.handleRetry} loading={isLoading} content="Retry" />,
      <Button onClick={this.handleChangeNode} content="Change Node" />
    ];

    return (
      <span>
        {failure.accountRetrievalError ? (
          <Modal
            open={failure.accountRetrievalError}
            size="small"
            style={{ textAlign: 'center' }}
          >
            <Modal.Content>{this.renderContent(buttons)}</Modal.Content>
          </Modal>
        ) : (
          <FairyContainer>
            <FairyContainer.Column position="left" separator="right">
              <FairyContainer.Column.Header>
                <AccountComponent accounts={accounts} loading={loading} />
              </FairyContainer.Column.Header>
              <FairyContainer.Column.Body>
                {actionMenu}
              </FairyContainer.Column.Body>
            </FairyContainer.Column>
            <FairyContainer.Column position="middle">
              <FairyContainer.Column.Header underlined>
                <BalanceComponent
                  account={accounts.account}
                  currency={currency}
                  names={accounts.names}
                  loading={loading}
                  settings={settings}
                />
              </FairyContainer.Column.Header>
              <FairyContainer.Column.Body>
                <WalletActions
                  activeItem={activeItem}
                  accounts={accounts}
                  actions={actions}
                />
              </FairyContainer.Column.Body>
            </FairyContainer.Column>
            <FairyContainer.Column position="right">
              <FairyContainer.Column.Header underlined>
                <UtilityStats account={accounts.account} />
              </FairyContainer.Column.Header>
              <FairyContainer.Column.Body className="no-side-padding">
                {subpanes[activeItem]}
              </FairyContainer.Column.Body>
            </FairyContainer.Column>
          </FairyContainer>
        )}
      </span>
    );
  }
}
