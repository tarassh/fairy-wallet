// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import WalletBalance from './Wallet/Balance';
import WalletActions from './Wallet/Actions';
import styles from './Wallet.css';

type Props = {
  states: {},
  accounts: {},
  history: {}
};

export default class Wallet extends Component<Props> {
  props: Props;
  state = {
    showStakedData: false
  }

  componentDidUpdate() {
    const { states, history } = this.props;
    if (!states.deviceConnected) {
      history.goBack();
    }
  }

  componentDidCatch(error) {
    const { history } = this.props;
    console.log(error);
    history.goBack();
  }

  onTabChange = (e, { activeIndex, panes }) => {
    this.setState({ showStakedData: panes[activeIndex].key === "stake" })
  }

  render() {
    const { accounts } = this.props;
    const { showStakedData } = this.state;

    const leftSegment = <WalletBalance accounts={accounts} showStakedData={showStakedData} />
    const rightSegment = <WalletActions onTabChange={this.onTabChange} />

    return (
      <Segment.Group horizontal className='wallet'>
        <Segment className='balance'>{leftSegment}</Segment>
        <Segment className='actions'>{rightSegment}</Segment>
      </Segment.Group>
    );
  }
}