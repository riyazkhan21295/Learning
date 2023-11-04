const express = require('express');

const authMiddleware = require('../middleware/auth');

const { login, dashboard } = require('../controllers/main');

const router = express.Router();

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

module.exports = router;