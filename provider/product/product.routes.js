const router = require('express').Router();
const controller = require('./product.controller');

router.get("/products", controller.getAll);
router.post("/products", controller.create);
router.get("/product/:id", controller.getById);
router.put("/product/:id", controller.update);
router.delete("/product/:id", controller.delete);

module.exports = router;