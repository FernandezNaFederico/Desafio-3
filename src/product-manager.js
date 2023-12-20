const fs = require("fs").promises;

class ProductManager {

    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
        this.productId = 0;
    }

    async addProduct(nuevoOjeto) {
        let {title, description, price, thumbnail,code, stock} = nuevoOjeto;

        if(!title || !description || !price || !thumbnail || !code || !stock)
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
        }

        this.products.push(newProduct);

        await this.saveFile(this.products);

    }

    getProducts(){
        console.log(this.products)
    }

    async getPruductById(id) {
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
}

module.exports = ProductManager;