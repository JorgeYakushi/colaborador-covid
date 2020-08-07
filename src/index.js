import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { createStore } from "redux";
import allReducers from "./Redux/Reducers";
import { Provider } from "react-redux";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
