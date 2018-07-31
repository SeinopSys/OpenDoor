import * as ActionTypes from "../action-types";

// Nav
export function updateTitle(title = null){
  return {
    type: ActionTypes.TITLE_UPDATE,
    payload: { title },
  };
}

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
export function stashesLoad(payload){
  return {
    type: ActionTypes.STASHES_LOAD,
    payload
  };
}

export function stashStore(payload){
  return {
    type: ActionTypes.STASH_STORE,
    payload
  };
}

export function stashUpdate(payload){
  return {
    type: ActionTypes.STASH_UPDATE,
    payload
  };
}

export function stashDestroy(payload){
  return {
    type: ActionTypes.STASH_DESTROY,
    payload
  };
}
