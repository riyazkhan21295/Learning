class CustomAPIError extends Error { 
    constructor (message, statusCode) { 
        super(message);

        this.statusCode = statusCode;
    }
}

const customError = (message, statusCode) => { 
    return new CustomAPIError(message, statusCode);
};

module.exports = { customError, CustomAPIError };