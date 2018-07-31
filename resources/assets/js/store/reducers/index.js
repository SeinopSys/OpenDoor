import { combineReducers } from "redux";
import auth from "./auth";
import persistStore from "./persistStore";
import { dialogReducer } from 'redux-reactstrap-modal';
import stashes from './stashes';
import nav from './nav';

const RootReducer = combineReducers({
  auth,
  persistStore,
  dialogReducer,
  stashes,
  nav,
});

export default RootReducer;
