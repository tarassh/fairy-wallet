/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import App from './containers/App';
import Locker from './containers/Locker';
import Wallet from './containers/Wallet';

export default (props) => (
  <App settings={props.settings} >
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Locker} />
        <Route path="/wallet" component={Wallet} />
      </Switch>
    </HashRouter>
  </App>
);
