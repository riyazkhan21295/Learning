require('dotenv').config();
require('express-async-errors');

const express = require('express');

const connectDB = require('./db/connect');

const mainRouter = require('./routes/main');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

// middleware
app.use(express.json());

app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Database connected');

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
})();