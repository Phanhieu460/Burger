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
  const [ingredients, setIngredients] = useState(null);
  const [price, setPrice] = useState(0);

  let location = useLocation();
  let match = useRouteMatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const ingredient = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredient[param[0]] = +param[1];
      }
      // ingredients[param[0]] = +param[1];
    }
    setIngredients(ingredient);
    setPrice(price);
  }, []);
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
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
        path={match.path + "/contact-data"}
        render={() => <ContactData ingredients={ingredients} price={price} />}
      />
    </div>
  );
};

export default Checkout;
