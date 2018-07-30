import axios from "../axios";
import * as action from "../store/actions";
import ValidationErrors, { responseIsValidationError } from "../common/validationErrors";

export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.post("/api/auth/login", credentials)
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
      axios.post("/api/auth/register", credentials)
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

export function userInfo() {
  return dispatch => (
    new Promise((resolve, reject) => {
      axios.post("/api/auth/me")
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


export const JWT_LS_KEY = "jwt_token";
export const setJWT = token => {
  console.warn('TOKEN SET', token);
  localStorage.setItem(JWT_LS_KEY, token);
  setAuthorizationHeader(token);
};
export const getJWT = () => localStorage.getItem(JWT_LS_KEY);
export const removeJWT = () => {
  console.warn("TOKEN REMOVED");
  localStorage.removeItem(JWT_LS_KEY);
};
export const setAuthorizationHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const authCheck = () => {
  const jwtToken = getJWT();
  console.log(jwtToken);
  if (jwtToken) {
    setAuthorizationHeader(jwtToken);
  }
};

export function validateToken() {
  return dispatch => {
    authCheck();
    return new Promise((resolve) => {
      axios.post("/api/auth/check")
        .then(res => {
          dispatch(action.authUser(res.data));
          return resolve();
        })
        .catch(() => {
          //dispatch(action.authLogout());
          return;
        });
    });
  };
}
