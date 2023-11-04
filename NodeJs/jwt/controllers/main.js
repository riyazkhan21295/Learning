const jwt = require('jsonwebtoken');

const { BadRequestError } = require('../errors');

const login = async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const id = Date.now();

    const token = jwt.sign({ id, username }, process.env.JWT_TOKEN, { expiresIn: '30d' });

    response.status(200).send({ msg: 'user created', token });
};

const dashboard = async (request, response) => {
    const luckyNumber = Math.floor(Math.random() * 100);

    response
        .status(200)
        .json({
            msg: `Hello, ${request.user.username}`,
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
        });
};

module.exports = {
    login,
    dashboard
};