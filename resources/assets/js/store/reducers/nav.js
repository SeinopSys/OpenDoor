import * as ActionTypes from "../actions";

const initialState = {
  title: '',
};

const nav = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.TITLE_UPDATE:
      return updateTitle(payload.title);
    default:
      return state;
  }
};

const updateTitle = title => ({
  title: typeof title === 'string' ? title : '',
});

export default nav;
