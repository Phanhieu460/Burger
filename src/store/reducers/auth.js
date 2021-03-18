import * as actionsType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (actionsType) {
    case actionsType.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionsType.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      });
    case actionsType.AUTH_FAIl:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};
export default reducer;
