import * as actionsType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionsType.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };

    case actionsType.AUTH_FAIl:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionsType.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
      };
    case actionsType.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    default:
      return state;
  }
};
export default reducer;
