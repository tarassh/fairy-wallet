// @flow
import _ from 'lodash'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Grid, Icon, Label, List, Table, Segment } from 'semantic-ui-react';

type Props = {
  accounts: {}
};

export default class Balance extends Component<Props> {
    props: Props;
    
    render() {
        const {
            accounts
        } = this.props;

        const tableData = [
            { currency: 'EOS', total: 15000 },
            { currency: 'Amber', total: 40000  },
            { currency: 'ShittyToken', total: 2500  },
            { currency: 'EosDolliar', total: 700000 },
        ]
        
        return (
            <Segment.Group className='no-border no-padding'>
                <Segment>
                    <Label>
                        Account:
                        <Label.Detail>
                            {accounts.account.account_name}
                        </Label.Detail>
                    </Label>
                </Segment>
                <Segment>
                    <Label>
                        Balance:
                        <Label.Detail>
                            {accounts.account.core_liquid_balance}
                        </Label.Detail>
                    </Label>
                </Segment>
                <Segment>
                    <Icon link name='plus square outline' />
                </Segment>
                <Segment>
                    <Table celled basic='very' compact='very' unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>
                              Currency
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                              Total
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {_.map(tableData, ({currency, total}) => (
                            <Table.Row key={currency}>
                              <Table.Cell collapsing>{currency}</Table.Cell>
                              <Table.Cell collapsing>{total}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </Segment.Group>
        );
    }
}