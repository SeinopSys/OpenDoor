import * as ActionTypes from "../action-types";

const initialState = {
  stashes: [],
};

const stashes = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.STASHES_LOAD:
      return load(state, payload);
    case ActionTypes.STASH_UPDATE:
      return update(state, payload);
    default:
      return state;
  }
};

const load = (state, payload) => {
  const { stashes } = payload;
  return {
    ...state,
    stashes,
  };
};

const update = (state, payload) => {
  const { stash } = payload;
  return {
    ...state,
    stashes,
  };
};

export default stashes;
