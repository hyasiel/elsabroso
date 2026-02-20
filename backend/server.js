const express = require("express");
const path = require("path");
const port = 3000;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve uploaded product images (match the URLs returned by controllers)
// make sure uploads directory exists when server starts
const fs = require("fs");
const uploadsPath = path.join(__dirname, "uploads", "products");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use("/uploads/products", express.static("uploads/products"));

//Routes
app.use("/auth", require("./src/routes/auth.routes"));
app.use("/products", require("./src/routes/product.routes"));
app.listen(port, () => {
  console.log("app listen in port " + port);
});
