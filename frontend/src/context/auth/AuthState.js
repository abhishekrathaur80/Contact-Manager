import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

//cutom hook to use auth context

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

//Action creators Load user

export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Register User
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post("http://localhost:8000/api/users", formData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    loadUser(dispatch);
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
  }
};

//Login User
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post("http://localhost:8000/api/auth", formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    loadUser(dispatch);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
  }
};

//LogOut
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};

//clear errors
export const clearError = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  //set token on app loading
  setAuthToken(state.token);

  //load user on first run or refresh
  if (state.loading) {
    loadUser(dispatch);
  }
  //set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);
  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
