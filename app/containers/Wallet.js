// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Wallet from '../components/Wallet';

import * as AccountActions from '../actions/accounts';
import * as ConnectionActions from '../actions/connection';
import * as TransactionActions from '../actions/transactions';
import * as CurrencyActions from '../actions/currency';
import * as ProducersActions from '../actions/producers';
import * as GlobalActions from '../actions/global';
import * as SettingsActions from '../actions/settings';
import * as ContactActions from '../actions/contacts';

type Props = {
  actions: {},
  states: {},
  loading: {},
  accounts: {},
  history: {},
  currency: {},
  failure: {},
  settings: {},
  contacts: {}
};

class WalletContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const { actions, accounts } = this.props;
    actions.getAccount(accounts.names[accounts.activeAccount]);
  }

  changeNode() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const {
      states,
      accounts,
      loading,
      history,
      currency,
      failure,
      actions,
      settings,
      contacts
    } = this.props;

    return (
      <Wallet
        accounts={accounts}
        states={states}
        loading={loading}
        history={history}
        currency={currency}
        failure={failure}
        actions={actions}
        settings={settings}
        contacts={contacts}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    states: state.states,
    accounts: state.accounts,
    loading: state.loading,
    transaction: state.transaction,
    currency: state.currency,
    failure: state.failure,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...AccountActions,
        ...ConnectionActions,
        ...TransactionActions,
        ...CurrencyActions,
        ...ProducersActions,
        ...GlobalActions,
        ...SettingsActions,
        ...ContactActions
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);
