import * as ActionTypes from "../action-types";


// Auth
export function authLogin(payload) {
  return {
    type: ActionTypes.AUTH_LOGIN,
    payload
  };
}

export function authUser(payload) {
  return {
    type: ActionTypes.AUTH_USER,
    payload
  };
}

export function authLogout() {
  return {
    type: ActionTypes.AUTH_LOGOUT
  };
}

// Stashes
export function loadStashes(payload){
  return {
    type: ActionTypes.STASHES_LOAD,
    payload
  };
}
