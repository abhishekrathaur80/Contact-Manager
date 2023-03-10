import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import { useAuth, register, clearError } from "../../context/auth/AuthState";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { setAlert } = alertContext;
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearError(authDispatch);
    }
  }, [error, isAuthenticated, authDispatch, setAlert, props.history]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || name === "") {
      setAlert("Please fill in all fields", "danger");
    } else if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      register(authDispatch, { name, email, password });
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary"> Register</span>
      </h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
            required
          />
        </div>
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
            minLength="6"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password2"
            name="password2"
            value={password2}
            onChange={changeHandler}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
