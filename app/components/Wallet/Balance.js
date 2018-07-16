// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Grid, Icon, Label, List, Table, Segment, Modal, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings'

type Props = {
    accounts: {},
    actions: {}
};

class Balance extends Component<Props> {
    constructor(props) {
        super(props);
        
        this.state = {
            token: '',
            modalOpen: false
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    };

    addToken = () => {
        const {
            accounts
        } = this.props;
        
        const {
            token
        } = this.state;
        
        this.props.actions.addToken(accounts.account.account_name, token);
        this.handleClose();
    }

    componentDidMount(){
        const {
            accounts
        } = this.props

    }
    
    render() {
        const {
            accounts,
            settings
        } = this.props;

        const { token } = this.state
        const staked = `${parseFloat(accounts.account.voter_info.staked / 10000).toFixed(4)} EOS`;
        
        return (
            <Segment.Group className='no-border no-padding'>
                <Segment>
                    <Label>
                        Account
                        <Label.Detail>
                            {accounts.account.account_name}
                        </Label.Detail>
                    </Label>
                </Segment>
                <Segment>
                    <Label>
                        Balance
                        <Label.Detail>
                            Staked/Delegated {staked}
                        </Label.Detail>
                        <Label.Detail>
                            Liquid {accounts.account.core_liquid_balance}
                        </Label.Detail>
                    </Label>
                </Segment>
                <Segment>
                    <Modal size='tiny' open={this.state.modalOpen} trigger={<Button onClick={this.handleOpen}>Add new token</Button>}>
                        <Modal.Content>
                            <Modal.Description>
                                <Input name='token' value={token} placeholder='Token name...' onChange={this.handleChange} />
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic onClick={this.addToken}>Add</Button>
                        </Modal.Actions>
                    </Modal>
                </Segment>
                <Segment>
                    <Table celled basic='very' compact='very' unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>
                              Currency
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                              Balance
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {_.map(accounts.balances, (balance, currency) => (
                            <Table.Row key={currency}>
                              <Table.Cell collapsing>{currency}</Table.Cell>
                              <Table.Cell collapsing>{balance}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </Segment.Group>
        );
    }
}

const mapStateToProps = state => {
    return {
        settings: state.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            addToken
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Balance);