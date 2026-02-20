const ProductService = require("./src/services/ProductService");
(async () => {
  try {
    const res = await ProductService.uploadProducts({
      title: "Test product",
      description: "desc",
      imageUrl: "/uploads/products/test.png",
      price: 9.99,
      category: "test",
    });
    console.log("result", res);
  } catch (e) {
    console.error("error", e);
  }
})();
