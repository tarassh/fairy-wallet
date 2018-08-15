// @flow
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import ActionsHistory from '../../containers/Wallet/Actions/History';
import ActionsSend from '../../containers/Wallet/Actions/Send';
import ActionStake from '../../containers/Wallet/Actions/Stake';
import ActionRam from '../../containers/Wallet/Actions/Ram';
import ActionVote from '../../containers/Wallet/Actions/Vote';
import Tokens from './Tokens';

type Props = {
  activeItem: string,
  accounts: {}
};

export default class Actions extends Component<Props> {
  props: Props;

  render() {
    const { activeItem, accounts } = this.props;

    const panes = {
      history: <ActionsHistory />,
      transferFunds: <ActionsSend />,
      stake: <ActionStake />,
      ram: <ActionRam />,
      voting: <ActionVote />
    };
    const subpanes = {
      history: <Tokens accounts={accounts} />,
      transferFunds: <Tokens accounts={accounts} />
    };

    return (
      <Segment.Group horizontal className="no-border">
        <Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={11}>{panes[activeItem]}</Grid.Column>
              <Grid.Column width={5}>{subpanes[activeItem]}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}
