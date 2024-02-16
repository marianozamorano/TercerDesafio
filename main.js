const fs = require("fs").promises;

class ProductManager {
    static Id = 1;
    constructor() {
        this.path = "./productos.json";
        this.productos = [];
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.productos = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("El archivo no existe. Se creará uno nuevo al agregar productos.");
            } else {
                console.error("Error al cargar productos:", error.message);
            }
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.productos, null, 2), 'utf-8');
        } catch (error) {
            console.error("Error al guardar productos:", error);
        }
    }
    async addProducts(nombre, descripcion, precio, imagen, code, stock) {
        try {

            await this.loadProducts();
            const validarId = this.productos.find(item => item.code === code);

            if (validarId) {
                console.log(`Error: Ya existe un producto con el code '${code}'. No se puede agregar.`);
            } else {
                const newProductos = {
                    Id: ProductManager.Id,
                    nombre,
                    descripcion,
                    precio,
                    imagen,
                    code,
                    stock
                };
                this.productos.push(newProductos);
                ProductManager.Id++;
                console.log(`Producto agregado según code '${code}'.`);
                await this.saveProducts();
            }
        } catch (error) {
            console.log("Error al agregar el producto", error);
        }
    }
    async getProducts() {
        await this.loadProducts()
        return this.productos;
    }
    async getProductById(Id) {
        try {
            await this.loadProducts();
            const product = this.productos.find(item => item.Id === Id);

            if (product) {
                console.log(`Se encontró un producto que coincide con el Id: ${Id}`);
                return product;
            } else {
                throw new Error(`No existe el producto con el Id: ${Id}`);
            }
        } catch (error) {
            console.error("Error al obtener el producto por Id:", error.message);
            throw error;
        }
    }

    async updateProductById(Id, updatedData) {
        try {
            await this.loadProducts();
            const index = this.productos.findIndex(item => item.Id === Id);

            if (index !== -1) {
                this.productos[index] = { ...this.productos[index], ...updatedData };
                await this.saveProducts();
                console.log(`Producto con Id ${Id} actualizado.`);
            } else {
                throw new Error(`No existe el producto con el Id: ${Id}`);
            }
        } catch (error) {
            console.error("Error al actualizar el producto por Id:", error.message);
            throw error;
        }
    }

    async deleteProductById(Id) {
        try {
            await this.loadProducts();
            const index = this.productos.findIndex(item => item.Id === Id);

            if (index !== -1) {
                this.productos.splice(index, 1);
                await this.saveProducts();
                console.log(`Producto con Id ${Id} eliminado.`);
            } else {
                throw new Error(`No existe el producto con el Id: ${Id}`);
            }
        } catch (error) {
            console.error("Error al eliminar el producto por Id:", error.message);
            throw error;
        }
    }
}

module.exports = ProductManager;
// const productManager = new ProductManager();

//Agregar un nuevo producto



// //Obtener todos los productos
// productManager.getProducts()
//     .then(productos => console.log(productos));

// // Obtener un producto por Id
// productManager.getProductById(1)
//     .then(productos => console.log(productos))
//     .catch(error => console.log(error));

// // Actualizar un producto por Id
// productManager.updateProductById(1, { precio: 250 })
//     .catch(error => console.log(error));

// // Eliminar un producto por Id
// productManager.deleteProductById(1)
//     .catch(error => console.log(error));
