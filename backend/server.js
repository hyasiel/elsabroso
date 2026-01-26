const express = require("express");
const path = require("path");
const port = 3000;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {});

app.post("/login", (req, res) => {});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  res.send("register endpoint");
});

app.get("/protected", (req, res) => {});

app.listen(port, () => {
  console.log("app listen in port " + port);
});
