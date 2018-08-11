// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProducers } from '../../../actions/producers';
import { getGlobal } from '../../../actions/global';
import { getCurrencyStats } from '../../../actions/currency';
import { voteProducer, resetState } from '../../../actions/transactions';
import { getAccount, getActions } from '../../../actions/accounts';
import Vote from '../../../components/Wallet/Actions/Vote'

type Props = {
  accounts: {},
  producers: {},
  loading: {},
  getCurrencyStats: () => {},
  getGlobal: () => {},
  transactions: {},
  getProducers: () => {},
  voteProducer: () => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

class VoteContainer extends Component<Props> {
  props: Props;

  componentDidMount(){
    this.props.getCurrencyStats();
    this.props.getGlobal();
    this.props.getProducers();
  }

  render() {
    const { producers, loading, transactions, accounts } = this.props;

    return (
      <Vote 
        accounts={accounts}
        producers={producers} 
        loading={loading} 
        transactions={transactions}
        voteProducer={this.props.voteProducer} 
        resetState={this.props.resetState}
        getAccount={this.props.getAccount}
        getActions={this.props.getActions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    producers: state.producers,
    loading: state.loading,
    transactions: state.transactions
  };
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { 
      getProducers, 
      voteProducer, 
      resetState,
      getActions,
      getAccount,
	getCurrencyStats, 
	getGlobal
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer);
