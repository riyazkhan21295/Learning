require('dotenv').config();
require('express-async-errors');

const express = require('express');

const connectDB = require('./db/connect');

// routers
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const app = express();

// middleware
app.use(express.json()); // express.json() os responsible for parsing JSON data and making it available in your express application as 'req.body'

// routes

app.get('/', (request, response) => {
    response.send(`
        <h1>Store API</h1>
        <a href="/api/v1/products">products route</a>
    `);
  });

// product routes

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => { 
    try {
        // connect DB
        await connectDB(process.env.MONGO_URI);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, console.log(`Server is listening port ${PORT}...`));
    } catch (error) {
        console.log('error :: ', error);
    }
};

start();


