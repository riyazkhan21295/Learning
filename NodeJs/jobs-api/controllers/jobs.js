const { StatusCodes } = require('http-status-codes');

const Job = require('../models/Job');
const { NotFoundError } = require('../errors');

const createJob = async (request, response) => {
    request.body.createdBy = request.user.userId;

    const job = await Job.create(request.body);

    response.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (request, response) => {
    const jobs = await Job.find({ createdBy: request.user.userId }).sort('createdAt');

    response.status(StatusCodes.OK).send({ jobs, count: jobs.length });
};

const getJob = async (request, response) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = request;

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    response.status(StatusCodes.OK).json({ job })
};

const deleteJob = async (request, response) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = request;

    const job = await Job.deleteOne({
        _id: jobId,
        createdBy: userId
    });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    response.status(StatusCodes.OK).send();
};

const updateJob = async (request, response) => {
    const {
        user: { userId },
        params: { id: jobId },
        body: { company, position }
    } = request;

    if (!company || !position) {
        throw new BadRequestError('Company or Position fields cannot be empty');
    }

    const job = await Job.findOneAndUpdate({
        createdBy: userId,
        _id: jobId
    }, request.body, { new: true, runValidators: true });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    response.status(StatusCodes.OK).json({ job });
};

module.exports = {
    createJob,
    getAllJobs,
    getJob,
    deleteJob,
    updateJob,
};