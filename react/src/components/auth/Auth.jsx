import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, authSignup } from "../../store/actions/auth";
import Loader from "../Loader";
import SignIn from "./SignIn";
import SignUp from "./SingUp";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [loginForm, setLoginForm] = useState(true);

  const changeForm = () => {
    setLoginForm(!loginForm);
  };

  const authenticate = (e) => {
    e.preventDefault();
    if (loginForm) {
      dispatch(authLogin(e.target.username.value, e.target.password.value));
    } else {
      dispatch(
        authSignup(
          e.target.username.value,
          e.target.email.value,
          e.target.password.value,
          e.target.password2.value
        )
      );
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && loginForm && (
        <SignIn
          changeForm={changeForm}
          authenticate={authenticate}
          error={error}
        />
      )}
      {!loading && !loginForm && (
        <SignUp
          changeForm={changeForm}
          authenticate={authenticate}
          error={error}
        />
      )}
    </>
  );
};

export default Auth;
