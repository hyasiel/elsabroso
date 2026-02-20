const ProductService = require("./src/services/ProductService");
(async () => {
  const products = await ProductService.getAllProducts();
  console.log("products", products);
})();
