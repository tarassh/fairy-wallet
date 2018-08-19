import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';
import _ from 'lodash';

type Props = {
  context: {}
};

class VoteContext extends Component<Props> {
  render() {
    const { context } = this.props;
    const text =
      context.producers.length > 0 ? (
        <p className="dashed-border">
          You are about to vote for <strong>{context.producers.length}</strong>{' '}
          block producers. Transaction details are listed below.
        </p>
      ) : (
        <p>
          You are about to discard your vote. Transaction details are listed
          below.
        </p>
      );

    const groups = [];
    _.forEach(context.producers, producer => {
      const { length } = groups;
      if (length === 0 || groups[length - 1].length === 8) {
        groups.push([producer]);
      } else {
        groups[length - 1].push(producer);
      }
    });

    let content = '';
    if (context !== null) {
      content = (
        <div>
          {text}
          <Table basic="very" attached="top">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={3}>Contract</Table.Cell>
                <Table.Cell>Action</Table.Cell>
                <Table.Cell>Account</Table.Cell>
                <Table.Cell>Producers</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{context.contract}</Table.Cell>
                <Table.Cell>{context.action}</Table.Cell>
                <Table.Cell>{context.account}</Table.Cell>
                <Table.Cell>
                  {_.map(groups, (group, i) => (
                    <div key={`group-${i}`}>
                      <Header
                        size="tiny"
                        textAlign="center"
                        dividing
                        style={{ marginBottom: '0em', marginTop: '1em' }}
                      >
                        {`Page ${i + 1}`}
                      </Header>
                      {group.join(' ')}
                    </div>
                  ))}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      );
    }

    return content;
  }
}

export default VoteContext;
