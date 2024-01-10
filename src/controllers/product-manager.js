const fs = require("fs").promises;

class ProductManager {

    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
        this.productId = 0;
    }

    async addProduct(nuevoOjeto) {
        let {title, description, price, thumbnail,code, stock, category} = nuevoOjeto;

        if(!title || !description || !price || !thumbnail || !code || !stock || !category)
        {
            console.log("Todos los campos son requeridos, compltalos o hasta la vista beibi");
            return;
        }

        if(this.products.some(item => item.code === code)){
            console.log("Que sea un codigo unico por favor");
            return;
        }

        const newProduct = {
            id: ++this.productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
        }

        this.products.push(newProduct);

        await this.saveFile(this.products);

    }

    getProducts(){
        console.log(this.products)
    }

    async getProductsById(id) {
        try {
            const arrayProducts = await this.readFile();
            const buscado = arrayProducts.find(item => item.id === id);

            if(!buscado) {
                console.log("Producto no encontrado");
            }else {
                console.log("Yes, lo encontramos!");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo", error);
        }

    }

    async readFile() {
        try{
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(respuesta);
            return arrayProducts;

        } catch (error) {
            console.log("Error al leer un archivo", error);
            return [];
        }
    }

    async saveFile(arrayProduct) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProduct, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    async updateProduct(id,productoActualizado) {
        try {
            const arrayProductos = await this.readFile();

            const index = arrayProductos.findIndex(item => item.id === id);

            if(index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.saveFile(arrayProductos);
            } else {
                console.log("no se encuentra producto");
            }

        } catch (error){
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
        try {
            const productosArray = await this.readFile();

            const index = productosArray.findIndex(item => item.id === id);

            if(index !== -1) {
                productosArray.splice(index, 1);
                await this.saveFile(productosArray);
            } else {
                console.log("no se encuentra producto");
            }

        } catch (error){
            console.log("Error al actualizar el producto", error);
        }
    }

    async addToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        if (cart.error) return cart;

        const productIndex = cart.products.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ id: productId, quantity });
        }

        await this.saveCarts();
        return cart;
    }

    async createCart() {
        const cart = { id: this.nextCartId++, products: [] };
        this.carts.push(cart);
        await this.saveCarts();
        return cart;
    }

    async getCartById(cartId) {
        const cart = this.carts.find(cart => cart.id === cartId);
        return cart || { error: 'Carrito no encontrado' };
    }
}

module.exports = ProductManager;