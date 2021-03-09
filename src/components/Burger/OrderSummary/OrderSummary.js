import React from "react";
import Aux from "../../../hoc/Auxx/Auxx";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h2>Your Order</h2>
      <p>A delicious</p>
      <ul>{ingredientSummary}</ul>
      <p>Total Price:{props.price.toFixed(2)}</p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};
export default orderSummary;
