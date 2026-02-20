const express = require("express");
const router = express.Router();
const {
  UploadProducts,
  UpdateProducts,
  GetProducts,
  GetProductById,
} = require("../controllers/ProductController");
const ProductService = require("../services/ProductService");
const { upload } = require("../middlewares/UploadMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

// public routes for retrieving products
router.get("/", GetProducts);
router.get("/:id", GetProductById);

// admin routes for creating/updating products
// note: mount path is `/products`, so using `/` here results in `/products`
router.post("/", AuthMiddleware, upload.single("image"), UploadProducts);

// DEBUG route: bypass auth for testing uploads (remove this in production)
router.post("/debug", upload.single("image"), async (req, res) => {
  console.log("DEBUG upload called, body", req.body, "file", req.file);
  try {
    const imageUrl = req.file
      ? `/uploads/products/${req.file.filename}`
      : undefined;
    const result = await ProductService.uploadProducts({
      title: req.body.title,
      description: req.body.description,
      imageUrl,
      price: req.body.price,
      category: req.body.category,
    });
    return res.status(201).json(result);
  } catch (err) {
    console.error("DEBUG upload error", err);
    return res.status(500).json({ error: err.message });
  }
});

// allow updating existing product (front-end was using /products/updateproducts)
router.post(
  "/updateproducts",
  AuthMiddleware,
  upload.single("image"),
  UpdateProducts,
);

module.exports = router;
