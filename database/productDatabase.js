const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const readData = () => {
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(rawData);
};

const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

const getAllProducts = async () => {
    await delay(1500);
    return readData();
};

const getProductById = async (id) => {
    await delay(1500);
    const products = readData();
    const product = products.find(p => p.id === id);
    return product || null;
};

const createProduct = async (productData) => {
    await delay(1500);
    const products = readData();

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name: productData.name,
        price: Number(productData.price)
    };

    products.push(newProduct);
    writeData(products);

    return newProduct;
};

const updateProduct = async (id, updateData, isPartial = false) => {
    await delay(1500);
    const products = readData();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return null;
    }

    if (isPartial) {
        products[index] = {
            ...products[index],
            ...updateData,
            id: id
        };
    } else {
        products[index] = {
            id: id,
            name: updateData.name,
            price: Number(updateData.price)
        };
    }

    if (products[index].price !== undefined) {
        products[index].price = Number(products[index].price);
    }

    writeData(products);
    return products[index];
};

const deleteProduct = async (id) => {
    await delay(1500);
    const products = readData();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return false;
    }

    products.splice(index, 1);
    writeData(products);

    return true;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
