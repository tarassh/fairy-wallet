// @flow
import React, { Component } from 'react';
import { Segment, Menu, Icon } from 'semantic-ui-react';
import WalletBalance from './Wallet/Balance';
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
  state = { activeItem: 'history' }

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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onTabChange = (e, { activeIndex, panes }) => {
    this.setState({ panel: panes[activeIndex].key });
  };

  // render() {
  //   const { accounts, currency, loading } = this.props;
  //   const { panel } = this.state;

  //   const leftSegment = <WalletBalance accounts={accounts} panel={panel} />;
  //   const rightSegment = <WalletActions onTabChange={this.onTabChange} />;
  //   const balance = (
  //     <BalanceComponent
  //       account={accounts.account}
  //       currency={currency}
  //       names={accounts.names}
  //       loading={loading}
  //     />
  //   );

  //   return (
  //     <Segment.Group className="wallet">
  //       <Segment>{balance}</Segment>
  //       <Segment.Group horizontal className="wallet no-border">
  //         <Segment className="actions">{rightSegment}</Segment>
  //         <Segment className="balance">{leftSegment}</Segment>
  //       </Segment.Group>
  //     </Segment.Group>
  //   );
  // }

  render() {
    const { accounts, currency, loading } = this.props;
    const { activeItem } = this.state;

    const actionMenu = (
      <Segment className='no-border action-menu'>
        <Menu text vertical>
          <Menu.Item
            name='history'
            active={activeItem === 'history'}
            onClick={this.handleItemClick}
          >
            <Icon name='history' />
            HISTORY
          </Menu.Item>
          <Menu.Item
            name='transferFunds'
            active={activeItem === 'transferFunds'}
            onClick={this.handleItemClick}
          >
            <Icon name='send' />
            TRANSFER FUNDS
          </Menu.Item>
          <Menu.Item
            name='stake'
            active={activeItem === 'stake'}
            onClick={this.handleItemClick}
          >
            <Icon name='lock' />
            STAKE
          </Menu.Item>
          <Menu.Item
            name='ram'
            active={activeItem === 'ram'}
            onClick={this.handleItemClick}
          >
            <Icon name='microchip' />
            RAM
          </Menu.Item>
          <Menu.Item
            name='voting'
            active={activeItem === 'voting'}
            onClick={this.handleItemClick}
          >
            <Icon name='signup' />
            VOTING
          </Menu.Item>
        </Menu>
      </Segment>
    );


    return (
      <Segment.Group horizontal className="wallet">
        <Segment.Group className="menu">
          <AccountComponent accounts={accounts} loading={loading} />
          {actionMenu}
        </Segment.Group> 
        <Segment.Group className="context no-border">
          <Segment horizontal className="balance">
            <BalanceComponent
              account={accounts.account}
              currency={currency}
              names={accounts.names}
              loading={loading}
            />
            <WalletActions activeItem={activeItem} />
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
}
