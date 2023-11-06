const { StatusCodes } = require('http-status-codes');

const CustomApiError = require('../errors/custom-api');

const errorHandler = (error, request, response, next) => {
    let customError = {
        // set default
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong try again later',
    }

    // if (error instanceof CustomApiError) {
    //     const { statusCode, message } = error;

    //     return response.status(statusCode).json({
    //         msg: message,
    //     });
    // }

    if (error.code) {
        if (error.code === 11000) {
            customError = {
                // ...customError,
                statusCode: 400,
                message: `Duplicate value entered for ${Object.keys(error.keyValue)} field, please choose another value`,
            };
        }
    }

    if (error.name === 'ValidationError') {
        customError = {
            // ...customError,
            statusCode: 400,
            message: Object.values(error.errors)
                .map((item) => item.message)
                .join(','),
        };
    }

    if (error.name === 'CastError') {
        customError = {
            // ...customError,
            statusCode: 404,
            message: `No item found with id : ${error.value}`,
        };
    }

    return response.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandler;