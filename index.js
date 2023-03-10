const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./Routes/user");
const authRoutes = require("./Routes/auth");
const conatctRoutes = require("./Routes/contact");

mongoose
  .connect("mongodb://127.0.0.1:27017/contactApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongo db"));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ extended: false }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", conatctRoutes);

app.listen(8000, () => {
  console.log("hello");
});
