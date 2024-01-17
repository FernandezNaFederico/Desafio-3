const express = require("express");
const app = express();
const port = 8080;
const productRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

const { engine } = require('express-handlebars');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
});

/*
app.get("/", (req, res) => {
    res.render("index");
});*/

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

/*
app.get('/', (req, res) => {
    res.send("Bienvenidos a mi primera experiencia con EXPRESS")
});*/



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
