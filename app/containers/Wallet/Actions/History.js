// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import History from '../../../components/Wallet/Actions/History';
import { getActions } from '../../../actions/accounts';

type Props = {
  accounts: {},
  actions: {}
};

class HistoryContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const {
      actions,
      accounts
    } = this.props;

    const name = accounts.account.account_name;
    actions.getActions(name);
  }

  render() {
    const { accounts } = this.props;
    return (
      <History accounts={accounts} />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
