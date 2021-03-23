import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
// const addIngredient = (state, action) => {
//   const updatedIngredient = {
//     [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
//   };
//   const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
//   const updateState = {
//     ingredients: updatedIngredients,
//     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
//   };
//   return updateObject(state, updateState);
// };

// const removeIngredient = (state, action) => {
//   const updateIng = {
//     [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
//   };
//   const updateIngs = updateObject(state.ingredients, updateIng);
//   const updateSta = {
//     ingredients: updateIngs,
//     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
//   };
//   return updateObject(state, updateSta);
// };

// const setIngredient = (state, action) => {
//   return updateObject(state, {
//     ingredients: {
//       salad: action.ingredients.salad,
//       bacon: action.ingredients.bacon,
//       meat: action.ingredients.meat,
//       cheese: action.ingredients.cheese,
//     },
//     totalPrice: 4,
//     error: false,
//   });
// };

// const fetchIngredientsFailed = (state, action) => {
//   return updateObject(state, { error: true });
// };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    //ADD
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };

    //REMOVE
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };

    //SET
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      };

    //FETCH
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
