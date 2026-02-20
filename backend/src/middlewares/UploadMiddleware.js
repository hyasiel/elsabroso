const multer = require("multer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = { upload };

//upload middleware helper (verifies token without sending response)

const UploadMiddleware = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // caller should handle sending a response
    return "Unauthorized";
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret",
    );

    // attach decoded payload to request
    req.userId = decoded;
    console.log("Decoded token in upload middleware:", decoded);
    return "Authorized";
  } catch (err) {
    return "Unauthorized";
  }
};

module.exports = { upload, UploadMiddleware };
