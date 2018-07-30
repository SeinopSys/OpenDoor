import { combineReducers } from "redux";
import Auth from "./Auth";
import persistStore from "./persistStore";
import { loadingBarReducer } from 'react-redux-loading-bar';
import { dialogReducer } from 'redux-reactstrap-modal';

const RootReducer = combineReducers({ Auth, persistStore, loadingBar: loadingBarReducer, dialogReducer });

export default RootReducer;
