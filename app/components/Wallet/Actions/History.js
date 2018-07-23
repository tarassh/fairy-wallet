// @flow
import React, { Component } from 'react';
import { List, Grid } from 'semantic-ui-react';
import _ from 'lodash';

type Props = {
  actions: {}
};

export default class History extends Component<Props> {
  props: Props;

  render() {
    const { actions } = this.props;
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const options2 = { hour: '2-digit', minute: '2-digit' };
    const days = [];
    actions.forEach(value => {
      const { block_time } = value; // eslint-disable-line camelcase
      const date = new Date(block_time);
      const day = date.toLocaleDateString('en-US', options);
      const time = date.toLocaleTimeString('en-US', options2);

      let dayActions = _.find(days, { day });
      if (!dayActions) {
        dayActions = { day, actions: [] };
        days.push(dayActions);
      }

      const { trx_id } = value.action_trace; // eslint-disable-line camelcase
      const { account, name, data } = value.action_trace.act;
      const { act_digest } = value.action_trace.receipt; // eslint-disable-line camelcase
      const action = {
        block_time,
        time,
        txId: trx_id,
        txIdShort: `${trx_id.slice(0, 5)}...${trx_id.slice(-5)}`,
        account,
        name,
        data,
        digest: act_digest
      };

      dayActions.actions.push(action);
    });

    const items = _.map(days, dayGroup => (
      <List.Item key={dayGroup.day} style={{ marginBottom: '1em' }}>
        {dayGroup.day}
        <List.Content>
          <List selection relaxed divided>
            {_.map(dayGroup.actions, action => (
              <List.Item key={`${action.time}-${action.txId}-${action.digest}`}>
                <List.Content>{renderAction(action)}</List.Content>
              </List.Item>
            ))}
          </List>
        </List.Content>
      </List.Item>
    ));

    return <List id="scrollable-history">{items}</List>;
  }
}

function renderAction(action) {
  let data = '';
  Object.keys(action.data).forEach(key => {
    data = [data, key, action.data[key]].join(' ');
  });

  return (
    <Grid>
      <Grid.Column width={3}>{action.time}</Grid.Column>
      <Grid.Column width={3}>{action.txIdShort}</Grid.Column>
      <Grid.Column width={3}>{action.name}</Grid.Column>
      <Grid.Column width={7}>{data.trim()}</Grid.Column>
    </Grid>
  );
}
