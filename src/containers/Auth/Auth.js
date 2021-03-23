import React, { useState, useEffect } from "react";
import _ from "lodash/fp";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

const Auth = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [isSignup, setIsSignup] = useState(true);

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isAuthenticate = useSelector((state) => state.auth.token !== null);
  const buildingBurger = useSelector((state) => state.burgerBuilder.building);
  const authRedirectPath = useSelector((state) => state.auth.authRedirectPath);

  const dispatch = useDispatch();
  const onSetAuthRedirectPath = () => {
    dispatch(actions.setAuthRedirectPath("/"));
  };
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, []);
  const onSubmit = (data, e) => {
    e.target.reset();
    dispatch(actions.auth(data.email, data.password, isSignup));
    onSetAuthRedirectPath();
  };

  const onSubmitToSignin = () => {
    setIsSignup(!isSignup);
  };

  const errorMessage = null;
  if (error) {
    errorMessage = <p>{error.message}</p>;
  }
  let authRedirect = null;
  if (isAuthenticate) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }
  return (
    <>
      {authRedirect}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input
              name="email"
              ref={register({
                required: true,
              })}
            />
            {_.get("email.type", errors) === "required" && (
              <p>This field is required</p>
            )}

            <label>Password</label>
            <input
              name="password"
              ref={register({ required: true, minLength: 6, maxLength: 12 })}
            />
            {_.get("email.type", errors) === "required" && (
              <p>This field is required</p>
            )}
            {_.get("password.type", errors) === "minLength" && (
              <p>Password cannot exceed 6</p>
            )}
            {_.get("password.type", errors) === "maxLength" && (
              <p>Password cannot exceed 6</p>
            )}

            <button className={classes.button} type="submit">
              SUBMIT
            </button>
            <button
              onClick={onSubmitToSignin}
              className={classes.button}
              type="button"
            >
              SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
            </button>
          </form>
        </>
      )}
    </>
  );
};
export default Auth;
