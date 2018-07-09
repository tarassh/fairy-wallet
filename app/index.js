// import './app.global.css';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Input } from '../node_modules/semantic-ui-react';
import Root from './containers/Root';
import { min } from '../node_modules/rxjs/operators';
import { configureStore, history } from './store/configureStore';
import 'semantic-ui-css/components/list.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/step.min.css';
import 'semantic-ui-css/components/grid.min.css';
import 'semantic-ui-css/components/segment.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/label.min.css';
import 'semantic-ui-css/components/table.min.css';
import 'semantic-ui-css/components/tab.min.css';
import 'semantic-ui-css/components/menu.min.css';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}