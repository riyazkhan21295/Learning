const express = require('express');
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');

const router = express.Router();

router.route('/')
    .post(createTask)
    .get(getAllTasks);

router.route('/:id')
    .get(getTask)
    .delete(deleteTask)
    .patch(updateTask);

module.exports = router;
