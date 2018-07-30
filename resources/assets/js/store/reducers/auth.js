import * as ActionTypes from "../action-types";
import { setJWT, removeJWT } from '../../services/auth';

const user = {
  id: null,
  name: null,
  email: null,
  lang: null,
  role: null,
  createdAt: null,
  updatedAt: null
};

const initialState = {
  isAuthenticated: false,
  user
};

const auth = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.AUTH_LOGIN:
      return authLogin(state, payload);
    case ActionTypes.AUTH_USER:
      return authUser(state, payload);
    case ActionTypes.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
};

const authLogin = (state, payload) => {
  const { access_token, user } = payload;
  setJWT(access_token);
  return {
    ...state,
    isAuthenticated: true,
    user
  };
};

const authUser = (state, payload) => {
  const { user } = payload;
  return {
    ...state,
    isAuthenticated: true,
    user
  };
};

const authLogout = (state) => {
  removeJWT();
  return {
    ...state,
    isAuthenticated: false,
    user
  };
};

export default auth;
