const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");

//GET

router.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const allProds = await productManager.readFile();


        if (!isNaN(limit)) {
            const limitedProducts = allProds.slice(0, limit);
            res.send(limitedProducts);
        } else {
            res.send(allProds);
        }

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.get('/products/:pid', async (req, res) => {
    try {
        let pid = req.params.pid;
        const buscado = await productManager.getProductsById(pid);
        const error = { Error: "Producto no encontrado" };
        if (buscado) {
            res.send(buscado)
        } else {
            res.send({ error })
        }

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});

// POST
router.post('/', async (req, res) => {
    const { title, description, price,category, thumbnail, code, stock } = req.body;
    await productManager.addProduct({ title, description,category, price, thumbnail, code, stock });
    res.json({ message: "Videojuego agregado exitosamente" });
});

  // PUT
router.put('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)
    
    const updatedProduct = req.body;
    await productManager.updateProduct(productId, updatedProduct);
    res.json({ message: "Videojuego actualizado" });
});

  // DELETE
router.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    await productManager.deleteProduct(productId);
    res.json({ message: "Videojuego eliminado"});
    
    const products = await productManager.getProducts();
    res.send(products);
});

module.exports = router;
