const express = require("express");
const ProductManager = require("../main");
const PUERTO = 8080;
const app = express();

const productManager = new ProductManager();

productManager.addProducts("Smartphone", "Samsung A71", 2000, "Sin imagen", "abc100", 25);
productManager.addProducts("Smartphone", "Samsung A24", 3000, "Sin imagen", "abc101", 20);
productManager.addProducts("Smartphone", "Samsung A52", 4000, "Sin imagen", "abc102", 15);
productManager.addProducts("Smartphone", "Motorolla E40", 5000, "Sin imagen", "abc103", 23);
productManager.addProducts("Smartphone", "Iphone 15", 6000, "Sin imagen", "abc104", 18);
productManager.addProducts("Smartphone", "Iphone 14", 7000, "Sin imagen", "abc105", 31);
productManager.addProducts("Smartphone", "Iphone 15 PRO", 8000, "Sin imagen", "abc106", 40);
productManager.addProducts("Smartphone", "Samsung S23", 9000, "Sin imagen", "abc107", 10);
productManager.addProducts("Smartphone", "Samsung S22", 6000, "Sin imagen", "abc108", 12);
productManager.addProducts("Smartphone", "Samsung S21", 5000, "Sin imagen", "abc109", 17);

app.get("/", (req, res) => {
    //res.send("Hola");
    res.json(productManager);
    
})

app.get("/products", (req, res) => {
    const limit = req.query.limit;

    productManager.getProducts()
        .then((productos) => {
            if (limit) {
                const limitedProducts = productos.slice(0, parseInt(limit));
                res.json({ products: limitedProducts });
            } else {
                res.json({ products: productos });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener los productos.' });
        });
});

app.get("/products/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);

    productManager.getProductById(productId)
        .then((producto) => {
            res.json({ product: producto });
        })
        .catch((error) => {
            res.status(404).json({ error: error.message });
        });
});

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})