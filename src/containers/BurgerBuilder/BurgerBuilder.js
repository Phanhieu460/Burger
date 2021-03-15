import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Aux from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [totalPrice, setTotalPrice] = useState(4);
  const [errorState, setErrorState] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(
        "https://react-burgerbuilder-9ff2f-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => setIngredients(response.data))
      .catch((error) => {
        setErrorState(true);
      });
  }, []);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setPurchasable(sum > 0);
  };

  const addIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCounted = oldCount + 1;
    const updateIngredients = {
      ...ingredients,
    };
    updateIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice(newPrice);
    setIngredients(updateIngredients);

    updatePurchaseState(updateIngredients);
  };
  const removeIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updateIngredients = {
      ...ingredients,
    };
    updateIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setTotalPrice(newPrice);
    setIngredients(updateIngredients);

    updatePurchaseState(updateIngredients);
  };
  const purchaseHandler = () => {
    setPurchasing(true);
    // console.log(ingredients);
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push("price=" + totalPrice);
    const queryString = queryParams.join("&");
    history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  let disabledInfo = {
    ...ingredients,
  };
  let orderSummary = null;
  if (loading) {
    orderSummary = <Spinner />;
  }
  let burger = errorState.error ? (
    <p>Ingredient can`t be loaded</p>
  ) : (
    <Spinner />
  );
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemove={removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
          ordered={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        price={totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ingredients}
      />
    );
  }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     ings: state.ingredients,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onIngredientAdded: (ingName) =>
//       dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
//     onIngredientRemoved: (ingName) =>
//       dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
//   };
// };

export default BurgerBuilder;
