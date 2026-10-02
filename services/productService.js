const productDatabase = require('../database/productDatabase');

const getAllProducts = async () => {
    return await productDatabase.getAllProducts();
};

const getProductById = async (id) => {
    return await productDatabase.getProductById(id);
};

const createProduct = async (data) => {
    if (!data.name || data.price === undefined || data.price === null) {
        const error = new Error("Product 'name' and 'price' are required.");
        error.statusCode = 400;
        throw error;
    }

    if (typeof data.name !== 'string' || data.name.trim() === '') {
        const error = new Error("Product 'name' must be a non-empty string.");
        error.statusCode = 400;
        throw error;
    }

    if (isNaN(Number(data.price)) || Number(data.price) < 0) {
        const error = new Error("Product 'price' must be a non-negative number.");
        error.statusCode = 400;
        throw error;
    }

    return await productDatabase.createProduct(data);
};

const updateProduct = async (id, data, isPartial = false) => {
    if (!isPartial) {
        if (!data.name || data.price === undefined || data.price === null) {
            const error = new Error("PUT update requires both 'name' and 'price'.");
            error.statusCode = 400;
            throw error;
        }
    }

    if (data.price !== undefined && (isNaN(Number(data.price)) || Number(data.price) < 0)) {
        const error = new Error("Product 'price' must be a non-negative number.");
        error.statusCode = 400;
        throw error;
    }

    const updatedProduct = await productDatabase.updateProduct(id, data, isPartial);
    if (!updatedProduct) {
        const error = new Error(`Product with ID ${id} not found.`);
        error.statusCode = 404;
        throw error;
    }

    return updatedProduct;
};

const deleteProduct = async (id) => {
    const isDeleted = await productDatabase.deleteProduct(id);
    if (!isDeleted) {
        const error = new Error(`Product with ID ${id} not found.`);
        error.statusCode = 404;
        throw error;
    }

    return { message: `Product with ID ${id} deleted successfully.` };
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
