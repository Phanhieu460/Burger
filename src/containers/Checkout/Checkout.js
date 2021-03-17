import React, { useEffect } from "react";
import CheckoutSummry from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { useHistory, Route, useRouteMatch, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { useSelector } from "react-redux";

const Checkout = (props) => {
  // const [ingredients, setIngredients] = useState(null);
  // const [price, setPrice] = useState(0);

  // let location = useLocation();
  let match = useRouteMatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const purchased = useSelector((state) => {
    return state.order.purchased;
  });

  // useEffect(() => {
  //
  // }, []);
  const history = useHistory();
  const checkoutCancelledHandler = () => {
    history.goBack();
  };
  const checkoutContinuedHandler = () => {
    history.replace("/checkout/contact-data");
  };
  let summary = <Redirect to="/" />;

  if (ings) {
    const purchaseRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummry
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route path={match.path + "/contact-data"} component={ContactData} />
      </div>
    );
  }
  return summary;
};

export default Checkout;
