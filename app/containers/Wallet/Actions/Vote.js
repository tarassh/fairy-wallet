// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from '../../../components/Wallet/Actions/Vote'

type Props = {
  accounts: {},
  producers: {},
  loading: {},
  actions: {},
  transaction: {}
};

class VoteContainer extends Component<Props> {
  props: Props;

  componentDidMount(){
    const { actions } = this.props;
    actions.getCurrencyStats();
    actions.getGlobal();
    actions.getProducers();
  }

  render() {
    const { producers, loading, transaction, accounts, actions } = this.props;

    return (
      <Vote 
        accounts={accounts}
        producers={producers} 
        loading={loading} 
        transaction={transaction}
        actions={actions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    producers: state.producers,
    loading: state.loading,
    transaction: state.transaction
  };
}

export default connect(mapStateToProps, null)(VoteContainer);
