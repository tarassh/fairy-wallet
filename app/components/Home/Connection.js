// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ConnectionContainer from '../../containers/Home/Connection';

class Connection extends Component<Props> {
    render() {
        return (
          <Grid stretched textAlign="center" verticalAlign="middle" className="locker">
            <Grid.Row />
            <Grid.Row columns={3} className="container">
              <Grid.Column width={4} />
              <Grid.Column width={8}><ConnectionContainer /></Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>
            <Grid.Row />
          </Grid>
        );
    }
}

export default Connection;