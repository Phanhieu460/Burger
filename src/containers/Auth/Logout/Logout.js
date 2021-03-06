import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(actions.logout());
  };
  useEffect(() => {
    onLogout();
  }, []);
  return <Redirect to="/" />;
};
export default Logout;
