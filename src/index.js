import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import store from './store';

import File from './components/File';
import List from './components/List';
import Settings from './components/Settings';
import Notifications from './components/Notifications';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Notifications />
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/settings" component={Settings} />
          <Route path="/file/:urlId" component={File} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
