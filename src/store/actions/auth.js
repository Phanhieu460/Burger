import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userID: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIl,
    error: error,
  };
};
export const auth = (email, password, isSingup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOYKiihbSCri8DECtOpU2RazvjFexOG50";
    if (!isSingup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOYKiihbSCri8DECtOpU2RazvjFexOG50";
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
