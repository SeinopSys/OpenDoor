import axios from "../axios";
import * as action from "../store/actions";
import { responseIsValidationError } from "../common/validationErrors";
import ValidationErrors from "../common/validationErrors";

export function list() {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.get("/api/stash")
        .then(res => {
          dispatch(action.stashesLoad(res.data));
          return resolve(res.data);
        })
        .catch(err => {
          const statusCode = err.response.status;
          const data = {
            error: err.response.data.message,
            statusCode,
          };
          return reject(data);
        });
    })
  );
}

export function show(id) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.get(`/api/stash/${id}`)
        .then(res => {
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

export function types() {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.get(`/api/stash/types`)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          const statusCode = err.response.status;
          const data = {
            error: err.response.data.message,
            statusCode,
          };
          return reject(data);
        });
    })
  );
}

const catchAll = (reject) => (err => {
  console.log(err);
  const statusCode = err.response.status;
  const data = {
    error: null,
    statusCode,
  };
  if (statusCode === 422 || statusCode === 400) {
    data.error = err.response.data.message;
    if (responseIsValidationError(data.error))
      data.validationErrors = new ValidationErrors(err.response.data.errors);
  }
  return reject(data);
});

export function store(payload) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.post(`/api/stash`, payload)
        .then(res => {
          dispatch(action.stashStore(res.data));
          return resolve(res.data);
        })
        .catch(catchAll(reject));
    })
  );
}

export function update(payload, id) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.put(`/api/stash/${id}`, payload)
        .then(res => {
          dispatch(action.stashUpdate(res.data));
          return resolve(res.data);
        })
        .catch(catchAll(reject));
    })
  );
}

export function destroy(id) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.delete(`/api/stash/${id}`)
        .then(res => {
          dispatch(action.stashDestroy(res.data));
          return resolve(res.data);
        })
        .catch(catchAll(reject));
    })
  );
}

export function addBalance(payload, id) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.post(`/api/stash/${id}/balance`, payload)
        .then(res => {
          dispatch(action.stashUpdate(res.data));
          resolve(res.data);
        })
        .catch(catchAll(reject));
    })
  );
}
