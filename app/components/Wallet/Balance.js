// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';

import AccountSwitcher from '../Shared/AccountSwitcher';
import BalanceComponent from '../Shared/BalanceComponent';
import PublicKeyComponent from '../Shared/PublicKeyComponent';
import StakedStats from './StakedStats';
import Tokens from './Tokens';

type Props = {
  showStakedData: boolean,
  accounts: {}
};

class Balance extends Component<Props> {
  handleAccountSwitch = name => {
    console.log(name);
  };

  render() {
    const { accounts, showStakedData } = this.props;

    if (accounts.balances !== null) {
      delete accounts.balances.EOS;
    }

    const details = showStakedData ? (
      <StakedStats account={accounts.account} />
    ) : (
      <Tokens accounts={accounts} />
    );

    return (
      <Segment.Group className="no-border no-padding">
        <Segment>
          <PublicKeyComponent />
        </Segment>
        <Segment>
          <AccountSwitcher
            accounts={accounts}
            onChange={this.handleAccountSwitch}
          />
        </Segment>
        <Segment>
          <BalanceComponent account={accounts.account} />
        </Segment>
        <Segment>{details}</Segment>
      </Segment.Group>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  currency: state.currency
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addToken,
      getCurrencyStats
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
