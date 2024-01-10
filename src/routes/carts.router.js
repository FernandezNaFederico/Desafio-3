const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/carrito.json");

// POST 

router.post('/', async (req, res) => {
    const cart = await productManager.createCart();
    res.json(cart);
});

// GET 
router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await productManager.getCartById(cartId);
    res.json(cart);
});

// POST

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const { quantity } = req.body;

    const result = await productManager.addToCart(cartId, productId, quantity);
    res.json(result);
});

module.exports = router;


