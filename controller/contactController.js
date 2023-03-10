const Contact = require("../Model/Contact");
const { validationResult } = require("express-validator");
const res = require("express/lib/response");

const getUserContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const postNewConatct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;
  try {
    let newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const putUpdateConatct = async (req, res) => {
  const { name, email, phone, type } = req.body;
  const conatctField = {};
  if (name) conatctField.name = name;
  if (email) conatctField.email = email;
  if (phone) conatctField.phone = phone;
  if (type) conatctField.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: conatctField },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const deleteContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Conatct removed" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getUserContacts,
  postNewConatct,
  putUpdateConatct,
  deleteContact,
};
