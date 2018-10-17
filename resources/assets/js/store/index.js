import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import RootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import { persistStore } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  RootReducer,
  composeEnhancers(
    applyMiddleware(ReduxThunk, logger)
  )
);
persistStore(store);
export default store;
