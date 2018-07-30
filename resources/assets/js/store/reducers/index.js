import { combineReducers } from "redux";
import auth from "./auth";
import persistStore from "./persistStore";
import { dialogReducer } from 'redux-reactstrap-modal';
import stashes from './stashes';

const RootReducer = combineReducers({
  auth,
  persistStore,
  dialogReducer,
  stashes,
});

export default RootReducer;
