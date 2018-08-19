// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ConnectionContainer from '../../containers/Locker/Connection';

class Connection extends Component<Props> {
  render() {
    return (
      <Grid
        stretched
        textAlign="center"
        verticalAlign="middle"
        className="locker"
      >
        <Grid.Row columns={1} className="container">
          <Grid.Column width={7}>
            <ConnectionContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Connection;
