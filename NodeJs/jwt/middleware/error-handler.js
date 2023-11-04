const { CustomApiError } = require('../errors');

const errorHandler = (error, request, response, next) => {
    let statusCode = 500;
    let errorMessage = 'Something went wrong try again later';

    if (error instanceof CustomApiError) {
        statusCode = error.statusCode;
        errorMessage = error.message;
    }

    return response.status(statusCode).json({ msg: errorMessage });
};

module.exports = errorHandler;