import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import { useHistory } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions/index";

const ContactData = (props) => {
  const [intimateState, setIntimateState] = useState({
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      stress: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  });
  // const [loading, setLoading] = useState(false);

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const loading = useSelector((state) => state.order.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  const onOrderBurger = (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token));

  const history = useHistory();

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementidentifier in intimateState.orderForm) {
      formData[formElementidentifier] =
        intimateState.orderForm[formElementidentifier].value;
    }
    const order = {
      ingredients: ings,
      price: price,
      orderData: formData,
      userId: userId,
    };
    onOrderBurger(order, token);
  };
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== " " && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  const inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updateOrderForm = {
      ...intimateState.orderForm,
    };
    const updateFormElement = { ...updateOrderForm[inputIdentifier] };
    updateFormElement.value = event.target.value;
    updateFormElement.valid = checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updateOrderForm[inputIdentifier] = updateFormElement;
    let formIsValid = true;
    for (let inputIdentifiers in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
    }
    setIntimateState({
      orderForm: updateOrderForm,
      formIsValid: formIsValid,
    });
  };
  const formElementsArray = [];
  for (let key in intimateState.orderForm) {
    formElementsArray.push({
      id: key,
      config: intimateState.orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button
        btnType="Success"
        clicked={orderHandler}
        disabled={!intimateState.formIsValid}
      >
        ORDER
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h2>Enter your contact data</h2>
      {form}
    </div>
  );
};
export default ContactData;
