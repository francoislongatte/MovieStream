import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'
import reduxThunk from "redux-thunk";

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    return next(action)
  }
}

const configureStore = (history) => {
  return createStore(
    reducers(history),
    composeWithDevTools(
      applyMiddleware(
        logger,
        reduxThunk,
        routerMiddleware(history)
      )
    )
  );
};


export default configureStore;
