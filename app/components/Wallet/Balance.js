// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Grid, Icon, Label, List, Table } from 'semantic-ui-react';

type Props = {
  accounts: Array<string>
};

export default class Balance extends Component<Props> {
    props: Props;
    
    const tableData = [
          { currency: 'John', total: 15 },
          { currency: 'Amber', total: 40  },
          { currency: 'Leslie', total: 25  },
          { currency: 'Ben', total: 70 },
        ]
    
    render() {
        const {
            accounts
        } = this.props;
        
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
                                <Label.Detail>{'name'}</Label.Detail>
                              </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='left'>
                            <Label>
                                Balance
                                <Label.Detail>{'balance'}</Label.Detail>
                              </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Table sortable celled fixed>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell
                                      sorted={column === 'currency' ? direction : null}
                                      onClick={this.handleSort('currency')}>
                                      Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column === 'total' ? direction : null}
                                      onClick={this.handleSort('total')}>
                                      Age
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                  {_.map(data, ({ currency, total }) => (
                                    <Table.Row key={name}>
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