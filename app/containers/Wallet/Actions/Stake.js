import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stake from '../../../components/Wallet/Actions/Stake';
import _ from 'lodash';

type Props = {
  actions: {},
  states: {},
  loading: {},
  accounts: {}
};

class StakeContainer extends Component<Props> {
  props: Props;

  render() {
    return(
      <Stake />
    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.actions,
    accounts: state.accounts,
    settings: state.settings,
    transaction: state.transaction
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAccount
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeContainer);