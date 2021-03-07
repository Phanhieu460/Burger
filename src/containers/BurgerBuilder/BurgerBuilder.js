import React, { useState } from "react";
import Aux from "../../hoc/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
  const [loadingState, setLoadingState] = useState({
    loading: true,
  });
  const [purchasableState, setPurchasableState] = useState({
    purchasbale: false,
  });
  const [purchasingState, setPurchasingState] = useState({
    purchasing: false,
  });
  const [ingredientState, setIngredientState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  });
  const [totalPriceState, setTotalPrice] = useState({
    totalPrice: 4,
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
  const PurchaseContinueHandler = () => {
    setLoadingState({
      loading: true,
    });
    const order = {
      ingredients: ingredientState.ingredients,
      price: totalPriceState.totalPrice,
      customer: {
        name: "Hieu",
        address: {
          stress: "abc",
          zipCode: "1234",
          country: "VietNam",
        },
        email: "phb460@gmail.com",
      },
      deliveryMethod: "test",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoadingState({ loading: false });
        setPurchasingState({ purchasing: false });
      })
      .catch((error) => {
        setLoadingState({ loading: false });
        setPurchasingState({ purchasing: false });
      });
  };

  let disabledInfo = {
    ...ingredientState.ingredients,
  };
  let orderSummary = (
    <OrderSummary
      price={totalPriceState.totalPrice}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={PurchaseContinueHandler}
      ingredients={ingredientState.ingredients}
    />
  );
  if (loadingState.loading) {
    orderSummary = <Spinner />;
  }
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
};

export default BurgerBuilder;
