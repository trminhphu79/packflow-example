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
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Raw Body:', req.body);
  console.log("Update Request Body:", req.body);
  console.log("Update Request Params:", req.params);
  console.log("Execute update product " + req.params.id);

  // Validate request body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Product data cannot be empty",
      receivedHeaders: req.headers,
      receivedBody: req.body
    });
  }

  const { type, name, version } = req.body;

  if (!type || !name || !version) {
    return res.status(400).send({
      message: "Product type, name and version are required",
      receivedData: { type, name, version }
    });
  }

  try {
    const product = await repository.update(req.params.id, { type, name, version });
    
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    console.log("Updated product:", product);
    res.send(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({
      message: "Error updating product",
      error: error.message
    });
  }
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
