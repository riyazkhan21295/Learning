const jwt = require('jsonwebtoken');

const { UnauthenticatedError } = require('../errors');

const auth = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = await jwt.verify(token, process.env.JWT_TOKEN);

        request.user = {
            userId: payload.userId,
            name: payload.name
        };

        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
};

module.exports = auth;