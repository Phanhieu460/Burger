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

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
  const [purchasableState, setPurchasableState] = useState({
    purchasbale: false,
  });
  const [purchasingState, setPurchasingState] = useState({
    purchasing: false,
  });
  const [ingredientState, setIngredientState] = useState({
    ingredients: null,
  });
  const [totalPriceState, setTotalPrice] = useState({
    totalPrice: 4,
  });
  const [errorState, setErrorState] = useState({
    error: false,
  });
  const [loadingState, setLoadingState] = useState({
    loading: true,
  });
  const history = useHistory();
  useEffect(() => {
    axios
      .get(
        "https://react-burgerbuilder-9ff2f-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) =>
        setIngredientState({
          ingredients: response.data,
        })
      )
      .catch((error) => {
        setErrorState({ error: true });
      });
  });

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setPurchasableState({ purchasable: sum > 0 });
  };

  const addIngredientHandler = (type) => {
    const oldCount = ingredientState.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updateIngredients = {
      ...ingredientState.ingredients,
    };
    updateIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPriceState.totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice({ totalPrice: newPrice });
    setIngredientState({
      ingredients: updateIngredients,
    });

    updatePurchaseState(updateIngredients);
  };
  const removeIngredientHandler = (type) => {
    const oldCount = ingredientState.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updateIngredients = {
      ...ingredientState.ingredients,
    };
    updateIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPriceState.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setTotalPrice({ totalPrice: newPrice });
    setIngredientState({
      ingredients: updateIngredients,
    });

    updatePurchaseState(updateIngredients);
  };
  const purchaseHandler = () => {
    setPurchasingState({
      purchasing: true,
    });
  };
  const purchaseCancelHandler = () => {
    setPurchasingState({
      purchasing: false,
    });
  };
  const purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in ingredientState.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(ingredientState.ingredients[i])
      );
    }
    queryParams.push("price=" + totalPriceState.totalPrice);
    const queryString = queryParams.join("&");
    history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  let disabledInfo = {
    ...ingredientState.ingredients,
  };
  let orderSummary = null;
  let burger = errorState.error ? (
    <p>Ingredient can`t be loaded</p>
  ) : (
    <Spinner />
  );
  if (ingredientState.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredientState.ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemove={removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPriceState.totalPrice}
          purchasable={purchasableState.purchasable}
          ordered={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        price={totalPriceState.totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ingredientState.ingredients}
      />
    );
  }

  // if (loadingState.loading) {
  //   orderSummary = <Spinner />;
  // }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  return (
    <Aux>
      <Modal
        show={purchasingState.purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default BurgerBuilder;
