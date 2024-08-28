const express = require("express");
const cookieParser = require('cookie-parser')
const User = require("./Routes/UserRoute");
const books = require("./Routes/BooksRoute");
const DBconnection = require("./config/DB");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
DBconnection();

app.use("/User", User);
app.use("/Books", books);

app.listen(3005, () => {
  console.log("Server Running");
});
