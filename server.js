const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/products', productRoutes);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});