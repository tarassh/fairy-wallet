// @flow
import React, { Component } from 'react';
import { Tab, Segment, Table } from 'semantic-ui-react';
import _ from 'lodash'

type Props = {
  accounts: {}
};

export default class History extends Component<Props> {
  props: Props;

  render() {

    const tableData = [
      { currency: 'EOS', total: 15000 },
      { currency: 'Amber', total: 40000 },
      { currency: 'ShittyToken', total: 2500 },
      { currency: 'EosDolliar', total: 700000 },
    ]

    const content =
      (<Segment className='no-border'>
        <Table celled basic='very' compact='very' unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Account
              </Table.HeaderCell>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Time
              </Table.HeaderCell>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(tableData, ({ currency, total }) => (
              <Table.Row key={currency}>
                <Table.Cell collapsing>{currency}</Table.Cell>
                <Table.Cell collapsing>{total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
       </Segment>);

    return (
      <Tab.Pane content={content} className='history' />
    );
  }
}