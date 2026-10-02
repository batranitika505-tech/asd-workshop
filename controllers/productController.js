const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cacheMiddleware');

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.json(products);
    } catch (err) {
        console.error("Error in getAllProducts controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID format. Must be a number." });
        }

        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
    } catch (err) {
        console.error("Error in getProductById controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        invalidateCache();
        return res.status(201).json(newProduct);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        console.error("Error in createProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID format. Must be a number." });
        }

        const updatedProduct = await productService.updateProduct(id, req.body, false);
        invalidateCache();
        return res.json(updatedProduct);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        console.error("Error in updateProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const patchProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID format. Must be a number." });
        }

        const updatedProduct = await productService.updateProduct(id, req.body, true);
        invalidateCache();
        return res.json(updatedProduct);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        console.error("Error in patchProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID format. Must be a number." });
        }

        const result = await productService.deleteProduct(id);
        invalidateCache();
        return res.json(result);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        console.error("Error in deleteProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
