import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Map } from 'immutable';
import thunk from 'redux-thunk';

let middleware = applyMiddleware(thunk);

if (process && process.env.NODE_ENV === 'development') {
  const { composeWithDevTools } = require('redux-devtools-extension');
  middleware = composeWithDevTools(middleware);
}

const store = createStore(reducers, Map({}), middleware);

export default store;
