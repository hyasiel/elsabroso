const ProductService = require("../services/ProductService");
// create new product
async function UploadProducts(req, res) {
  // AuthMiddleware already validated the JWT and attached req.userId
  try {
    console.log("UploadProducts called, body:", req.body, "file:", req.file);

    // only admins can create products
    const auth = require("../services/AuthService");
    const user = await auth.userRepository.findById(req.userId.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Only admins can create products" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const imageUrl = `/uploads/products/${req.file.filename}`;

    const result = await ProductService.uploadProducts({
      title: req.body.title,
      description: req.body.description,
      imageUrl,
      price: req.body.price,
      category: req.body.category,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error("UploadProducts error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Server error", details: err });
  }
}

// update existing product
async function UpdateProducts(req, res) {
  try {
    // only admins may update
    const auth = require("../services/AuthService");
    const user = await auth.userRepository.findById(req.userId.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Only admins can update products" });
    }

    const { id, title, description, price, category } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Product id is required" });
    }

    let imageUrl;
    if (req.file) {
      imageUrl = `/uploads/products/${req.file.filename}`;
    }

    const result = await ProductService.updateProduct(id, {
      title,
      description,
      price,
      category,
      imageUrl,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// PUBLIC ENDPOINTS --------------------------------------------------
// fetch all products
async function GetProducts(req, res) {
  try {
    const products = await ProductService.getAllProducts();
    console.log("GetProducts returned", products.length, "rows");

    // return the shape the front‑end expects
    const transformed = products.map((p) => ({
      id: p.id,
      name: p.name,
      url: p.image_url,
      info: p.description,
      category: p.category,
      price: p.price,
    }));

    return res.status(200).json(transformed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// fetch a single product by id
async function GetProductById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Product id is required" });
  }
  try {
    const product = await ProductService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

//---------------------------------------------------------------------

module.exports = {
  UploadProducts,
  UpdateProducts,
  GetProducts,
  GetProductById,
};
