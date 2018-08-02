// @flow
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';
import { setActiveAccount } from '../../actions/accounts';

import AccountSwitcher from '../Shared/AccountSwitcher';
import BalanceComponent from '../Shared/BalanceComponent';
import PublicKeyComponent from '../Shared/PublicKeyComponent';
import StakedStats from './StakedStats';
import Tokens from './Tokens';

type Props = {
  actions: {},
  showStakedData: boolean,
  accounts: {},
  loading: {},
  currency: {}
};

class Balance extends Component<Props> {
  handleAccountSwitch = name => {
    const { actions, accounts } = this.props;
    const index = accounts.names.indexOf(name);
    actions.setActiveAccount(index);
  };

  render() {
    const { accounts, showStakedData, loading, currency } = this.props;

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
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left" width={4}>
                <PublicKeyComponent short />
              </Grid.Column>
              <Grid.Column floated="left">
                <AccountSwitcher
                  accounts={accounts}
                  onAccountSwitch={this.handleAccountSwitch}
                  loading={loading}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <BalanceComponent account={accounts.account} currency={currency} />
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
      setActiveAccount,
      addToken,
      getCurrencyStats
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
