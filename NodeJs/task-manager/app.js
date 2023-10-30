require('dotenv').config();

const express = require('express');

const taskRoutes = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

/** middleware */

app.use(express.static('./public'));

// express.json() os responsible for parsing JSON data and making it available in your express application as 'req.body'
app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => { 
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('CONNECTED TO THE DB...');

        const port = process.env.PORT;

        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log('error :: ', error);
    }
};

start();

