// @flow
import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import styles from './Home.css';
import Lock from './Lock';
import Connect from './Connect';

type Props = {
  ledger: {}
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const {
      ledger
    } = this.props;
    let state = 0;
    if (ledger.publicKey !== null) {
      state = 1;
    }

    let uiSegment = <Lock />;
    if (state === 1) {
      uiSegment = <Connect />;
    }

    return (
      <div className={styles.container} data-tid="container">
        <Grid
          textAlign="center"
        >
          <Grid.Column
            verticalAlign="middle"
          >
            <Container>
              {uiSegment}
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
