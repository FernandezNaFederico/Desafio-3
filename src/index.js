const express = require("express");
const ProductManager = require("./product-manager");
const app = express();
const puerto = 8080;

const manager = new ProductManager("./products.json");


app.get('/', (req, res) => {
    res.send("Bienvenidos a mi primera experiencia con EXPRESS")
})


app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const allProds = await manager.readFile();


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


app.get('/products/:pid', async (req, res) => {
    try {
        let pid = req.params.pid;
        const prod = await manager.getProductsById(pid);
        const error = { Error: "Producto no encontrado" };
        if (prod) {
            res.send(prod)
        } else {
            res.send({ error })
        }

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});


app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});