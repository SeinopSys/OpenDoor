import axios from "../axios";
import * as action from "../store/actions";

export function list() {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.get("/api/stash")
        .then(res => {
          dispatch(action.loadStashes(res.data));
          return resolve(res.data);
        })
        .catch(err => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };
          if (statusCode === 404) {
            data.error = err.response.data.message;
          }
          return reject(data);
        });
    })
  );
}
