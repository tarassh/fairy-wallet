// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProducers } from '../../../actions/producers';
import { voteProducer } from '../../../actions/transactions';
import { getGlobal } from '../../../actions/global';
import { getCurrencyStats } from '../../../actions/currency';
import Vote from '../../../components/Wallet/Actions/Vote'

type Props = {
  producers: {},
  loading: {},
  getCurrencyStats: () => {},
  getGlobal: () => {},
  getProducers: () => {},
  voteProducer: () => {}
};

class VoteContainer extends Component<Props> {
  props: Props;

  componentDidMount(){
    this.props.getCurrencyStats();
    this.props.getGlobal();
    this.props.getProducers();
  }

  render() {
    const { producers, loading } = this.props;

    return (
      <Vote producers={producers} loading={loading} voteProducer={this.props.voteProducer} />
    );
  }
}

function mapStateToProps(state) {
  return {
    producers: state.producers,
    loading: state.loading
  };
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getProducers, getCurrencyStats, getGlobal, voteProducer },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer);
