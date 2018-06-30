// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>To begin, connect and unlock your Ledger Wallet.</h2>
          <h3>Then, open the Eos app on your device.</h3>
        </div>
      </div>
    );
  }
}
