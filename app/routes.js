/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Wallet from './containers/Wallet';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wallet" component={Wallet} />
    </Switch>
  </App>
);
