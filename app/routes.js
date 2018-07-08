/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import App from './containers/App';
import Home from './containers/Home';
import Wallet from './containers/Wallet';

export default () => (
  <App>
    <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/wallet" component={Wallet} />
        </Switch>
    </HashRouter>
  </App>
);
