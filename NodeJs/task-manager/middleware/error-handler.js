const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (error, request, response, next) => { 
    if (error instanceof CustomAPIError) { 
        const { statusCode, message } = error;

        return response
            .status(statusCode)
            .json({
                msg: message
            });
    }

    return response
        .status(500)
        .json({
            msg: 'Something went wrong, please try again'
        });
}

module.exports = errorHandlerMiddleware;