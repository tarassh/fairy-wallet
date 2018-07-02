// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../components/Home';

import * as LedgerActions from "../actions/ledger";


type Props = {
    history: {},
    actions: {},
    ledger: {}
};

class HomePage extends Component<Props> {
    props: Props;

    componentDidMount() {
        const {
            actions
        } = this.props;
        actions.startListen();
    }

    componentDidUpdate() {
        const {
            ledger
        } = this.props;
        console.log(ledger);
    }

    componentWillUnmount() {
        const {
            actions
        } = this.props;
        actions.stopListen();
    }

    render() {
        const {
            history,
            ledger
        } = this.props;
        return (
          <Home
            history={history}
            ledger={ledger}
          />
        );
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
