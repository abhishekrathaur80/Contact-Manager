import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import { useAuth, login, clearError } from "../../context/auth/AuthState";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearError(authDispatch);
    }
  }, [error, isAuthenticated, authDispatch, setAlert]);

  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login(authDispatch, { email, password });
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary"> Login</span>
      </h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
