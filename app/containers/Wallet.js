// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Grid } from 'semantic-ui-react';

type Props = {
    history: {},
    actions: {},
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
                        'dummy'
                    </Grid.Column>
                    <Grid.Column width={10}>
                        'dummy'
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

//function mapDispatchToProps(dispatch) {
//    return {
//        actions: bindActionCreators({
//            ...StateActions,
//            ...LedgerActions
//        }, dispatch)
//    };
//}

export default connect(mapStateToProps, null)(WalletContainer);