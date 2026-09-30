const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const fileToPath = path.join(__dirname,'server.js')
const data = JSON.parse(fs.readFileSync(fileToPath, 'utf-8'));
const products = data.products;

app.get("/products",(req,res) => {
    res.json(products)
})
app.get("/products/:id",(req,res) => {
    const id = Number(req.params.id)
    const find = products.find((x) => x.id == id)
    if(!find){
        return res.status(404).json({
            message: "Product not found"
        })
    }
    res.json(find)
})
app.listen(3000, () => {
    console.log("Server running on port 3000")
})
