import * as ActionTypes from "../action-types";
import axios from "../../axios";

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
  isAdmin: false,
  user
};

const setAuthorizationHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const LOCAL_STORAGE_KEY = "jwt_token";

const Auth = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.AUTH_LOGIN:
      return authLogin(state, payload);
    case ActionTypes.AUTH_CHECK:
      return checkAuth(state);
    case ActionTypes.AUTH_LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

const authLogin = (state, payload) => {
  const jwtToken = payload.token;
  const user = payload.user;
  localStorage.setItem(LOCAL_STORAGE_KEY, jwtToken);
  setAuthorizationHeader(jwtToken);
  state = Object.assign({}, state, {
    isAuthenticated: true,
    user
  });
  return state;
};

const checkAuth = (state) => {
  const jwtToken = localStorage.getItem(LOCAL_STORAGE_KEY);
  state = Object.assign({}, state, {
    isAuthenticated: !!jwtToken,
  });
  if (state.isAuthenticated) {
    setAuthorizationHeader(jwtToken);
  }
  return state;
};

const logout = (state) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  state = Object.assign({}, state, {
    isAuthenticated: false,
    user
  });
  return state;
};

export default Auth;
