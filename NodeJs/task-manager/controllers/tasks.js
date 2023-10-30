const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { customError } = require('../errors/custom-error');

const createTask = async (request, response) => {
	const task = await Task.create(request.body);

	response.status(201).json({ task });
};

const getAllTasks = async (request, response) => {
	const tasks = await Task.find({});

	response.status(200).send({ tasks });
};

const getTask = async (request, response, next) => {
	const taskId = request.params.id;

	const task = await Task.findOne({ _id: taskId });

    if (!task) {
        return next(customError(`No task with id :: ${taskId}`, 404));
	}

	response.status(200).send({ task });
};

const deleteTask = async (request, response) => {
	const taskId = request.params.id;

	const task = await Task.findOneAndDelete({
		_id: taskId,
	});

	if (!task) {
		if (!task) {
            return next(customError(`No task with id :: ${taskId}`, 404));
        }
	}

	response.status(200).json({ task });
};

const updateTask = async (request, response) => {
	const taskId = request.params.id;

	const options = {
		runValidators: true,
		new: true,
	};

	const task = await Task.findOneAndUpdate(
		{ _id: taskId },
		request.body,
		options
	);

	if (!task) {
		if (!task) {
            return next(customError(`No task with id :: ${taskId}`, 404));
        }
	}

	response.status(200).json({ task });
};

module.exports = {
	createTask: asyncWrapper(createTask),
	getAllTasks: asyncWrapper(getAllTasks),
	getTask: asyncWrapper(getTask),
	deleteTask: asyncWrapper(deleteTask),
	updateTask: asyncWrapper(updateTask),
};
