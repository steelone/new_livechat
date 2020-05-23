import React from "react";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./store/reducers/rootReducer";
import { forbiddenWordsMiddleware } from "./store/actions/middleware";
import { sagaWatcher } from "./store/sagas/sagas";


const saga = createSagaMiddleware();

const middleware = applyMiddleware(
  thunk,
  forbiddenWordsMiddleware,
  saga
);
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(middleware)
);

saga.run(sagaWatcher);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById("root"));

serviceWorker.unregister();
