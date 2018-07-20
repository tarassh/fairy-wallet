import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stake from '../../../components/Wallet/Actions/Stake';
import { delegate, undelegate } from '../../../actions/transaction';

type Props = {
  actions: {},
  settings: {},
  loading: {},
  accounts: {}
};

class StakeContainer extends Component<Props> {
  props: Props;

  render() {
    const { actions, accounts, loading, settings } = this.props;

    return (
      <Stake
        actions={actions}
        accounts={accounts}
        loading={loading}
        settings={settings}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        delegate,
        undelegate
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeContainer);
