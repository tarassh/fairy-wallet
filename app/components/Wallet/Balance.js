// @flow
import _ from 'lodash'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Grid, Icon, Label, List, Table } from 'semantic-ui-react';

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
            <Container textAlign="center">
                <Grid stretched={true}>
                   <Grid.Row>
                        <Grid.Column textAlign='left'>
                            <Label floating>
                                Wallet
                            </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='left'>
                            <Label>
                                Account
                                <Label.Detail>{accounts.account.account_name}</Label.Detail>
                              </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='left'>
                            <Label>
                                Balance
                                <Label.Detail>{accounts.account.core_liquid_balance}</Label.Detail>
                              </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Table celled fixed>
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
                                    <Table.Row>
                                      <Table.Cell>{currency}</Table.Cell>
                                      <Table.Cell>{total}</Table.Cell>
                                    </Table.Row>
                                  ))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}