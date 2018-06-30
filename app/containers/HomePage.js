// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../components/Home';

import * as LedgerActions from "../actions/ledger";


const Transport = require("@ledgerhq/hw-transport-node-hid").default;

type Props = {
  actions: {},
  ledger: {}
};

class HomePage extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);


    const sub = Transport.listen({
      next: e => {
        if (e.type === 'add') {
          sub.unsubscribe();
          Transport.open(e.descriptor).then(transport => {
            console.log(transport);
            transport.setDebugMode(true);
            props.actions.deviceConnected(transport);
          });
        }
        if (e.type === 'remove') {
          
        }
      }
    });
  }

  

  render() {
    return <Home />;
  }
}

function mapStateToProps(state) {
  return {
    ledger: state.ledger
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...LedgerActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
