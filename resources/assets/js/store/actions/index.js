export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_USER = "AUTH_USER";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const STASHES_LOAD = "STASHES_LOAD";
export const STASH_STORE = "STASH_STORE";
export const STASH_UPDATE = "STASH_UPDATE";
export const STASH_DESTROY = "STASH_DESTROY";
export const TITLE_UPDATE = "TITLE_UPDATE";

// Nav
export function updateTitle(title = null){
  return {
    type: TITLE_UPDATE,
    payload: { title },
  };
}

// Auth
export function authLogin(payload) {
  return {
    type: AUTH_LOGIN,
    payload
  };
}

export function authUser(payload) {
  return {
    type: AUTH_USER,
    payload
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT
  };
}

// Stashes
export function stashesLoad(payload){
  return {
    type: STASHES_LOAD,
    payload
  };
}

export function stashStore(payload){
  return {
    type: STASH_STORE,
    payload
  };
}

export function stashUpdate(payload){
  return {
    type: STASH_UPDATE,
    payload
  };
}

export function stashDestroy(payload){
  return {
    type: STASH_DESTROY,
    payload
  };
}
