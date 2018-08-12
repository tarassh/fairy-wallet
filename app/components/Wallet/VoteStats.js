import React, { Component } from 'react';
import { Segment, Header, List, Grid } from 'semantic-ui-react';
import _ from 'lodash';


type Props = {
  account: {}
};

class VoteStats extends Component<Props> {

  renderGroup = (group) => (
    <h5>
      <Grid>
        <Grid.Row>
          {
            _.map(group, producer => (
              <Grid.Column width={5} key={producer}>{producer}</Grid.Column>
            ))
          }
        </Grid.Row>
      </Grid>
    </h5>
  )

  render() {
    const { account } = this.props;
    const { producers } = account.voter_info;

    const groups = [];
    _.forEach(producers, (producer) => {
      const { length } = groups
      if (length === 0 || groups[length-1].length === 3) {
        groups.push([producer])
      } else {
        groups[length-1].push(producer)
      }
    });

    let content;
    if (producers && producers !== null && producers.length > 0) {
      content = (
        <List divided relaxed>
          {_.map(groups, (group, i) => (
            <List.Item key={`group-${i}`}>
              <List.Content>
                {this.renderGroup(group)}
              </List.Content>
            </List.Item>
          ))}
        </List>
      );
      
    } else {
      content = <h5 style={{textAlign: 'center', padding: '1em'}}>You have not give vote for any block producer</h5>
    }

    return (
      <Segment>
        <Header
          size="tiny"
          textAlign="center"
          dividing
          style={{ marginBottom: '0em', marginTop: '1em' }}
        >
          <h5>Elected Block Producers</h5>
        </Header>
        {content}
      </Segment>
    );
  }
}

export default VoteStats;
