import React, { useState } from "react";
import _ from "lodash/fp";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";

const Auth = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [isSignup, setIsSignup] = useState(true);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(actions.auth(data.email, data.password, isSignup));
  }; // your form submit function which will invoke after successful validation

  //   console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        name="email"
        ref={register({
          required: true,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {_.get("email.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      {_.get("email.type", errors) === "pattern" && (
        <p>Alphabetical characters only</p>
      )}

      <label>Password</label>
      <input name="password" ref={register({ minLength: 6, maxLength: 12 })} />
      {_.get("password.type", errors) === "minLength" && (
        <p>Password cannot exceed 6</p>
      )}
      {_.get("password.type", errors) === "maxLength" && (
        <p>Password cannot exceed 6</p>
      )}

      <input className={classes.button} type="submit" value="SUBMIT" />
      <input
        className={classes.button}
        type="button"
        value="SWITCH TO SIGNIN"
      />
    </form>
  );
};
export default Auth;
