import React, { useState, useEffect } from "react";
import CheckoutSummry from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {
  useHistory,
  useLocation,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

const Checkout = (props) => {
  const [ingredientState, setIngredientState] = useState({
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    price: 0,
  });

  const [totalPriceState, setTotalPrice] = useState({
    totalPrice: 4,
  });

  let location = useLocation();
  let match = useRouteMatch();
  useEffect(() => {
    let price = 0;
    const query = new URLSearchParams(location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
      // ingredients[param[0]] = +param[1];
    }
    setIngredientState({
      ingredients: ingredients,
    });
    setTotalPrice({
      totalPrice: price,
    });
  });
  const history = useHistory();
  const checkoutCancelledHandler = () => {
    history.goBack();
  };
  const checkoutContinuedHandler = () => {
    history.replace("/checkout/contact-data");
  };
  return (
    <div>
      <CheckoutSummry
        ingredients={ingredientState.ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
        path={match.path + "/contact-data"}
        render={() => (
          <ContactData
            ingredients={ingredientState.ingredients}
            price={totalPriceState.totalPrice}
          />
        )}
      />
    </div>
  );
};

export default Checkout;
