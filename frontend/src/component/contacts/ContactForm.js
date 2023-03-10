import React, { useState, useEffect } from "react";
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent,
} from "../../context/contact/ContactState";

const initalContact = {
  name: "",
  email: "",
  phone: "",
  type: "personal",
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();
  const { current } = contactState;
  const [contact, setContact] = useState(initalContact);
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initalContact);
    }
  }, [current]);
  const { name, email, phone, type } = contact;

  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch, contact).then(() => {
        setContact(initalContact);
      });
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={submitHandler}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        palaceholder="Name"
        name="name"
        value={name}
        onChange={changeHandler}
      />
      <input
        type="email"
        palaceholder="Email"
        name="email"
        value={email}
        onChange={changeHandler}
      />
      <input
        type="phone"
        palaceholder="Phone"
        name="phone"
        value={phone}
        onChange={changeHandler}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={changeHandler}
      />{" "}
      professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
