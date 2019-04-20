import reducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

// TODO: next line is tmp
window.store = store;
