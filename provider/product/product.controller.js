const ProductRepository = require("./product.repository");

const repository = new ProductRepository();

exports.getAll = async (req, res) => {
  console.log("Execute get all products...");
  const products = await repository.fetchAll();
  console.log("Finished get all products...");
  res.send(products);
};

exports.getById = async (req, res) => {
  console.log("Execute get product by id " + req.params.id);
  const product = await repository.getById(req.params.id);
  console.log("Finished get product by id " + req.params.id);

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.send(product);
};

exports.create = async (req, res) => {
  console.log("Execute create product...");

  if (!req.body.type || !req.body.name || !req.body.version) {
    return res.status(400).send({
      message: "Product type, name and version are required",
    });
  }

  const product = await repository.create(req.body);
  console.log("Finished create product...");
  res.status(201).send(product);
};

exports.update = async (req, res) => {
  console.log(req);
  console.log("Execute update product " + req.params.id);

  if (!req?.body?.type || !req?.body?.name || !req?.body?.version) {
    return res.status(400).send({
      message: "Product type, name and version are required",
    });
  }

  const product = await repository.update(req.params.id, req.body);
  console.log("Finished update product " + req.params.id);

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.send(product);
};

exports.delete = async (req, res) => {
  console.log("Execute delete product " + req.params.id);
  const success = await repository.delete(req.params.id);
  console.log("Finished delete product " + req.params.id);

  if (!success) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.status(204).send();
};

exports.repository = repository;
