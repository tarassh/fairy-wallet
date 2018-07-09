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
            { currency: 'John', total: 15 },
            { currency: 'Amber', total: 40  },
            { currency: 'Leslie', total: 25  },
            { currency: 'Ben', total: 70 },
        ]
        
        return (
            <Segment.Group className='no-border no-padding'>
                <Segment>
                    <Label>
                        {accounts.account.account_name}
                    </Label>
                </Segment>
                <Segment.Group>    
                    <Segment>
                        <Label>
                            Balance
                            <Label.Detail>
                                {accounts.account.core_liquid_balance}
                            </Label.Detail>
                        </Label>
                    </Segment>
                    <Segment>
                        <Table celled fixed className='scrolling'>
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
                                  <Table.Cell>{currency}</Table.Cell>
                                  <Table.Cell>{total}</Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Segment.Group>
            </Segment.Group>
        );
    }
}