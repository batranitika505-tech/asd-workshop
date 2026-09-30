const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const fileToPath = path.join(__dirname,'db.json')
const data = JSON.parse(fs.readFileSync(fileToPath, 'utf-8'));
const products = data;

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const cache = {}

app.get("/products",async (req,res) => {
    try{
        let key = req.url;
        let value= cache[key];
        if(value){
            return res.json(value);
        }
        await delay(1500);
        cache[key] = products;
        res.json(products); 
    }
    catch(err){
        console.log(err)
    }
    
})

app.get("/products/:id",async (req,res) => {
    try {
        let key = req.url;
        let value = cache[key];
        if (value) {
            return res.json(value);
        }
        await delay(1500);
        const id = Number(req.params.id);
        const find = products.find((x) => x.id === id);
        if (!find) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        cache[key] = find;
        res.json(find);
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})