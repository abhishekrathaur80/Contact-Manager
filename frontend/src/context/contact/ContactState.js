import React, { useReducer, useContext } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

//custom hook
export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

//Action creator

//get contact
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/api/contacts");
    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
  }
};

//add contact
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post("http://localhost:8000/api/contacts", contact);
    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
  }
};

//delete contact

export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`http://localhost:8000/api/contacts/${id}`);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
  }
};

//update contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/contacts/${contact._id}`,
      contact
    );
    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
  }
};

//clear contact
export const clearContacts = (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
};

//set current contact
export const setCurrent = (dispatch, contact) => {
  dispatch({ type: SET_CURRENT, payload: contact });
};

//clear current contact

export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

//filter contacts
export const filterContacts = (dispatch, text) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

//clear filter

export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

const ContactState = (props) => {
  const initalState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initalState);

  return (
    <ContactContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
