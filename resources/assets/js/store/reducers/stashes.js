import * as ActionTypes from "../actions";

const initialState = {
  list: [],
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
    list: stashes,
  };
};

const update = (state, payload) => {
  const { stash } = payload;

  const list = state.list.filter(s => s.id !== stash.id).concat(stash);
  return {
    ...state,
    list
  };
};

const destroy = (state, payload) => {
  const { id } = payload;

  const list = state.list.filter(stash => stash.id !== id);
  return {
    ...state,
    list
  };
};

export default stashes;
