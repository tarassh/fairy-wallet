// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { Menu, Icon, Modal, Button } from 'semantic-ui-react';
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
  getAccount: string => void,
  clearConnection: () => void
};

export default class Wallet extends Component<Props> {
  props: Props;
  state = { activeItem: 'history' };

  componentDidUpdate() {
    const { states, history } = this.props;
    if (!states.deviceConnected) {
      history.goBack();
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleRetry = () => {
    const { accounts } = this.props;
    this.props.getAccount(accounts.names[accounts.activeAccount]);
  }

  handleChangeNode = () => {
    const { history } = this.props;
    this.props.clearConnection();
    history.goBack();
  }

  renderContent = (action) => (
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
    const { accounts, currency, loading, failure } = this.props;
    const { activeItem } = this.state;

    const subpanes = {
      history: <Tokens accounts={accounts} />,
      transferFunds: <Tokens accounts={accounts} />,
      stake: (
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
          HISTORY
        </Menu.Item>
        <Menu.Item
          name="transferFunds"
          active={activeItem === 'transferFunds'}
          onClick={this.handleItemClick}
        >
          <Icon name="send" />
          TRANSFER FUNDS
        </Menu.Item>
        <Menu.Item
          name="stake"
          active={activeItem === 'stake'}
          onClick={this.handleItemClick}
        >
          <Icon name="lock" />
          STAKE
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
      </Menu>
    );

    let isLoading = false;
    _.forEach(loading, value => {
      if (value === true) {
        isLoading = true;
        return false;
      }
    });

    const actions = [
      <Button onClick={this.handleRetry} loading={isLoading} content="Retry" />,
      <Button onClick={this.handleChangeNode} content="Change Node" />
    ];

    return (
      <span>
        { failure.accountRetrievalError ? 
          <Modal
            open={failure.accountRetrievalError}
            size="small"
            style={{ textAlign: 'center' }}
          >
            <Modal.Content>
              {this.renderContent(actions)}
            </Modal.Content>
          </Modal> : 
          <FairyContainer>
            <FairyContainer.Column position="left" separator="right">
              <FairyContainer.Column.Header>
                <AccountComponent accounts={accounts} loading={loading} />
              </FairyContainer.Column.Header>
              <FairyContainer.Column.Body>{actionMenu}</FairyContainer.Column.Body>
            </FairyContainer.Column>
            <FairyContainer.Column position="middle">
              <FairyContainer.Column.Header underlined>
                <BalanceComponent
                  account={accounts.account}
                  currency={currency}
                  names={accounts.names}
                  loading={loading}
                />
              </FairyContainer.Column.Header>
              <FairyContainer.Column.Body>
                <WalletActions activeItem={activeItem} accounts={accounts} />
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
        }
      </span>
    );
  }
}
