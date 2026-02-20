// the product service is responsible for business logic around products
const repositories = require("../repositories/UserRepositories");

class ProductService {
  constructor() {
    // only need the product repo here for now
    this.productRepository = repositories.ProductRepository;
  }

  // admin functions
  async uploadProducts(product) {
    if (!product || !product.title || !product.description) {
      throw new Error("Missing product data");
    }

    return await this.productRepository.createNewPost(product);
  }

  async updateProduct(id, product) {
    if (!id) {
      throw new Error("Product id is required");
    }
    if (!product) {
      throw new Error("Product data is required");
    }

    return await this.productRepository.updatePost(id, product);
  }

  // public getters
  async getAllProducts() {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id) {
    if (!id) {
      throw new Error("Product id is required");
    }
    return await this.productRepository.findById(id);
  }
}

module.exports = new ProductService();
