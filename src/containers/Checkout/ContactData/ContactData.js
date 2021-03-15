import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import { useHistory } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const orderHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = {};
    for (let formElementidentifier in intimateState.orderForm) {
      formData[formElementidentifier] =
        intimateState.orderForm[formElementidentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        history.push("/");

        // setPurchasingState({ purchasing: false });
        // console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        // setPurchasingState({ purchasing: false });
        // console.log(error);
      });
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
