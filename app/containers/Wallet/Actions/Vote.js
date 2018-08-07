// @flow
import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

type Props = {
  account: {}
};


class VoteContainer extends Component<Props> {
  props: Props;
  render() {

    return (
      <Segment />
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accounts.account,
  };
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    dispatch
  );
}

export default connect(mapStateToProps, null)(VoteContainer);
