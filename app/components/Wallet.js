// @flow
import React, { Component } from 'react';
import { Segment, Menu, Icon } from 'semantic-ui-react';
import WalletActions from './Wallet/Actions';
import BalanceComponent from '../components/Shared/BalanceComponent';
import AccountComponent from '../components/Shared/AccountComponent';
import styles from './Wallet.css'; // eslint-disable-line no-unused-vars

type Props = {
  states: {},
  accounts: {},
  history: {},
  currency: {},
  loading: {}
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

  // componentDidCatch(error) {
  //   const { history } = this.props;
  //   console.log(error);
  //   history.goBack();
  // }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { accounts, currency, loading } = this.props;
    const { activeItem } = this.state;

    const actionMenu = (
      <Segment className="no-border action-menu">
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
      </Segment>
    );

    const showTotal = activeItem === 'history' || activeItem === 'voting';
    const showAvailable =
      activeItem === 'history' ||
      activeItem === 'transferFunds' ||
      activeItem === 'voting' ||
      activeItem === 'ram';
    const showStaked =
      activeItem === 'stake' ||
      activeItem === 'history' ||
      activeItem === 'voting';

    return (
      <Segment.Group horizontal className="wallet">
        <Segment.Group className="menu">
          <AccountComponent accounts={accounts} loading={loading} />
          {actionMenu}
        </Segment.Group>
        <Segment.Group className="context no-border">
          <Segment className="balance">
            <BalanceComponent
              account={accounts.account}
              currency={currency}
              names={accounts.names}
              loading={loading}
              showTotal={showTotal}
              showAvailable={showAvailable}
              showStaked={showStaked}
            />
            <WalletActions activeItem={activeItem} accounts={accounts} />
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
}
