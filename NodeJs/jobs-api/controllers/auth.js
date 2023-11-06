const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (request, response) => {
    const user = await User.create({ ...request.body });

    response.status(StatusCodes.CREATED).json({
        user: {
            name: user.name
        },
        token: user.createJWT()
    });
};

const login = async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        throw new BadRequestError('please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    response.status(StatusCodes.OK).json({
        user: {
            name: user.name
        },
        token: user.createJWT()
    });
};

module.exports = { register, login };
