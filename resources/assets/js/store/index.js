import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import RootReducer from "./reducers";
import ReduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  RootReducer,
  composeEnhancers(
    applyMiddleware(ReduxThunk)
  )
);
export default store;
