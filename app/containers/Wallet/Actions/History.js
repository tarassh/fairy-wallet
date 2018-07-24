// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import History from '../../../components/Wallet/Actions/History';
import { getActions } from '../../../actions/accounts';

type Props = {
  accounts: {},
  actions: {}
};

class HistoryContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { actions, accounts } = this.props;

    const name = accounts.account.account_name;
    actions.getActions(name);
  }

  render() {
    const { accounts, actions } = this.props;
    const history = accounts.actions === null ? [] : accounts.actions;
    return (
      <Segment className="no-border history">
        <History
          account={accounts.account}
          actions={history}
          getActions={actions.getActions}
        />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getActions
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
