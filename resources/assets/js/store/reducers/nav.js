import * as ActionTypes from "../action-types";

const initialState = {
  title: '',
};

const nav = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.TITLE_UPDATE:
      return updateTitle(state, payload);
    default:
      return state;
  }
};

const updateTitle = (state, payload) => {
  const { title } = payload;
  return {
    title: typeof title === 'string' ? title : '',
  };
};

export default nav;
