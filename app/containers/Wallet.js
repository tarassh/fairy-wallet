// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

type Props = {
    history: {},
    actions: {},
    settings: {},
    states: {},
    ledger: {}
};

class WalletContainer extends Component<Props> {
    props: Props;
    
      render() {
    const {
        states,
        ledger
    } = this.props;

    return (
        <Grid stretched={true} divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column width={6}>
                    '{leftSegment}'
                </Grid.Column>
                <Grid.Column width={10}>
                    '{rightSegment}'
                </Grid.Column>
            </Grid.Row>
        </Grid>
        );
    }
};

function mapStateToProps(state) {
    return {
        ledger: state.ledger,
        states: state.states,
        accounts: state.accounts
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...StateActions,
            ...LedgerActions
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));