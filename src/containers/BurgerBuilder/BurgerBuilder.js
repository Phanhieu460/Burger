import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Aux from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
import * as burgerBuilderAction from "../../store/actions/index";

const BurgerBuilder = () => {
  //const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  // const [ingredients, setIngredients] = useState(null);
  // const [totalPrice, setTotalPrice] = useState(4);
  // const [errorState, setErrorState] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const dispatch = useDispatch();
  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticate = useSelector((state) => state.auth.token !== null);

  const onIngredientAdded = (ingName) =>
    dispatch(burgerBuilderAction.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(burgerBuilderAction.removeIngredient(ingName));
  const onInitIngredients = () =>
    dispatch(burgerBuilderAction.initIngredients());
  const onInitPurchase = () => dispatch(burgerBuilderAction.purchaseInit());
  const onSetRedirectPath = (path) =>
    dispatch(burgerBuilderAction.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, []);

  const updatePurchaseState = (ings) => {
    const sum = Object.keys(ings)
      .map((igKey) => {
        return ings[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  // const addIngredientHandler = (type) => {
  //   const oldCount = ingredients[type];
  //   const updatedCounted = oldCount + 1;
  //   const updateIngredients = {
  //     ...ings,
  //   };
  //   updateIngredients[type] = updatedCounted;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   setTotalPrice(newPrice);
  //   setIngredients(updateIngredients);

  //   updatePurchaseState(updateIngredients);
  // };
  // const removeIngredientHandler = (type) => {
  //   const oldCount = ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCounted = oldCount - 1;
  //   const updateIngredients = {
  //     ...ingredients,
  //   };
  //   updateIngredients[type] = updatedCounted;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   setTotalPrice(newPrice);
  //   setIngredients(updateIngredients);

  //   updatePurchaseState(updateIngredients);
  // };
  const purchaseHandler = () => {
    if (isAuthenticate) {
      setPurchasing(true);
    } else {
      onSetRedirectPath("/checkout");
      history.push("/auth");
    }
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(ings[i])
    //   );
    // }
    // queryParams.push("price=" + price);
    // const queryString = queryParams.join("&");
    onInitPurchase();
    history.push("/checkout");
  };

  let disabledInfo = {
    ...ings,
  };
  let orderSummary = null;
  if (loading) {
    orderSummary = <Spinner />;
  }
  let burger = error ? <p>Ingredient can`t be loaded</p> : <Spinner />;
  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemove={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticate}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        price={price}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ings}
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

export default BurgerBuilder;
