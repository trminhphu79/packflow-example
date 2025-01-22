const router = require('express').Router();
const controller = require('./product.controller');

// Test route for debugging
router.post('/test', (req, res) => {
    console.log('Test route body:', req.body);
    res.json({ received: req.body });
});

router.get("/products", controller.getAll);
router.post("/products", controller.create);
router.get("/product/:id", controller.getById);
router.put("/product/:id", controller.update);
router.delete("/product/:id", controller.delete);

module.exports = router;