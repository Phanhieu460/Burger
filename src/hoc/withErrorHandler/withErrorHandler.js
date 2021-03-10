import React, { useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxx/Auxx";

const WithErrorHandler = (WrappedComponent, axios) => {
  const [errorState, setErrorState] = useState({
    error: null,
  });
  useEffect(() => {
    axios.interceptors.request.use((rep) => {
      setErrorState({
        error: null,
      });
      return rep;
    });
    axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setErrorState({
          error: error,
        });
      }
    );
  });
  const errorConfirmedHandler = () => {
    setErrorState({
      error: null,
    });
  };

  return (props) => {
    return (
      <Aux>
        <Modal show={errorState.error} modalClosed={errorConfirmedHandler}>
          {errorState.error ? errorState.error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default WithErrorHandler;
