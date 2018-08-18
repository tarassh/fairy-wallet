// @flow
import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import WalletActions from './Wallet/Actions';
import BalanceComponent from '../components/Shared/BalanceComponent';
import AccountComponent from '../components/Shared/AccountComponent';
import FairyContainer from '../components/Shared/UI/FairyContainer';
import styles from './Wallet.css'; // eslint-disable-line no-unused-vars
import Tokens from './Wallet/Tokens';
import StakedStats from './Wallet/StakedStats';
import UtilityStats from './Shared/UtilityStats';
import RamStats from './Wallet/RamStats'

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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { accounts, currency, loading } = this.props;
    const { activeItem } = this.state;

    const subpanes = {
      history: <Tokens accounts={accounts} />,
      transferFunds: <Tokens accounts={accounts} />,
      stake: <StakedStats  account={accounts.account} delegates={accounts.delegates} />,
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

    return (
      <FairyContainer>
        <FairyContainer.Column position='left' separator='right'>
          <FairyContainer.Column.Header>
            <AccountComponent accounts={accounts} loading={loading} />
          </FairyContainer.Column.Header>
          <FairyContainer.Column.Body>
            {actionMenu}
          </FairyContainer.Column.Body>
        </FairyContainer.Column>
        <FairyContainer.Column position='middle'>
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
        <FairyContainer.Column position='right'>
          <FairyContainer.Column.Header underlined>
            <UtilityStats account={accounts.account} />
          </FairyContainer.Column.Header>
          <FairyContainer.Column.Body>
            {subpanes[activeItem]}
          </FairyContainer.Column.Body>
        </FairyContainer.Column>
      </FairyContainer>
    );
  }
}
