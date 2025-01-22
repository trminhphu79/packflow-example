const Product = require("./product");

class ProductRepository {
  constructor() {
    this.products = new Map([
      ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1")],
      ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")],
      ["11", new Product("11", "PERSONAL_LOAN", "MyFlexiPay", "v2")],
      [
        "12",
        new Product("12", "MICHAEL_TRAN", "Hello bro, I'm Michael :))", "v3"),
      ],
      ["13", new Product("13", "DON_HO", "Hello bro, I'm Don HO :))", "v3")],
      ["14", new Product("14", "HIP", "Hello bro, I'm HIP :))", "v3")],
    ]);
  }

  async fetchAll() {
    return [...this.products.values()];
  }

  async getById(id) {
    return this.products.get(id);
  }

  async create(productData) {
    const id = String(this.products.size + 15); // Simple ID generation
    const product = new Product(id, productData.type, productData.name, productData.version);
    this.products.set(id, product);
    return product;
  }

  async update(id, productData) {
    if (!this.products.has(id)) {
      return null;
    }
    const product = new Product(id, productData.type, productData.name, productData.version);
    this.products.set(id, product);
    return product;
  }

  async delete(id) {
    if (!this.products.has(id)) {
      return false;
    }
    return this.products.delete(id);
  }
}

module.exports = ProductRepository;
