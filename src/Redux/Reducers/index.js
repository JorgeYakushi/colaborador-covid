import loggedReducer from "./isLogged";
import storeDataReducer from "./loadData";
import inputTextReducer from "./inputText";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  storeData: storeDataReducer,
  inputText: inputTextReducer,
});

export default allReducers;
