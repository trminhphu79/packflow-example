const ProductRepository = require("./product.repository");

const repository = new ProductRepository();

exports.getAll = async (req, res) => {
  console.log("Execute get all product...");
  res.send(await repository.fetchAll());
  console.log("Finished get all product...");
};
exports.getById = async (req, res) => {
  console.log("Execute get product by id " + req.params.id);
  const product = await repository.getById(req.params.id);
  console.log("Finished get product by id " + req.params.id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product not found" });
};

exports.repository = repository;
