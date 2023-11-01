require('dotenv').config();

const connectDB = require('../db/connect');
const Product = require('../models/product');

const jsonProducts = require('../data/products.json');

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('database connected');

        await Product.deleteMany();
        await Product.create(jsonProducts);

        console.log('Success!!!');
        process.exit(0);
    } catch (error) {
        console.log('error :: ', error);
        process.exit(1);
    }
})();