const express = require("express");
const path = require("path");
const port = 3000;
const app = express();

app.get("/api", (req, res) => {});

app.post("/login", (req, res) => {});

app.post("/register", (req, res) => {});

app.get("/protected", (req, res) => {});

app.listen(port, () => {
  console.log("app listen in port " + port);
});
