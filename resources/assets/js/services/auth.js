import Http from "../axios";
import * as action from "../store/actions";
import ValidationErrors from "../common/validationErrors";

export const responseIsValidationError = errorMessage => errorMessage === "The given data was invalid.";

export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post("/api/auth/login", credentials)
        .then(res => {
          dispatch(action.authLogin(res.data));
          return resolve();
        })
        .catch(err => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };
          if (statusCode === 401 || statusCode === 422) {
            data.error = err.response.data.message;
            if (responseIsValidationError(data.error))
              data.validationErrors = new ValidationErrors(err.response.data.errors);
          }
          return reject(data);
        });
    })
  );
}

export function register(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post("/api/auth/register", credentials)
        .then(res => {
          dispatch(action.authLogin(res.data));
          return resolve();
        })
        .catch(err => {
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
    })
  );
}

export function userInfo(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post("/api/auth/me", credentials)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
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
    })
  );
}
