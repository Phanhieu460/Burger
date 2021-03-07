import React, { useState } from "react";
import CheckoutSummry from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  const [ingredientState, setIngredientState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  });
  const checkoutCancelledHandler = () => {};
  return (
    <div>
      <CheckoutSummry ingredients={ingredientState.ingredients} />
    </div>
  );
};

export default Checkout;
