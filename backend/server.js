const express = require("express");
const path = require("path");
const port = 3000;
const app = express();
const cors = require("cors");
const { User } = require("./database/models/Users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/auth", require("./database/routes/auth.routes"));



app.listen(port, () => {
  console.log("app listen in port " + port);
});
