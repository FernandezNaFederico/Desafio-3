const express = require("express");
const app = express();
const puerto = 8080;
const productRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);


app.get('/', (req, res) => {
    res.send("Bienvenidos a mi primera experiencia con EXPRESS")
});


app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});