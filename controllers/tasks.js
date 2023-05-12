const Task = require("../models/Task")
const ErrorResponse = require("../utils/ErrorResponse")
const asyncHandler = require("../middlewares/asyncHandler")
const colors = require("colors")

//@desc     Get all tasks
//@route    GET /api/v1/Tasks
//@access   Public
const getTasks = asyncHandler(async (req, res, next) => {
    res.status(200).send(res.advancedResults)
    console.log("The Tasks have been fetched successfully".green)
})

//@desc     Get a single Task
//@route    GET /api/v1/tasks/:id
//@access   Public
const getTask = asyncHandler(async (req, res, next) => {

    const task = await Task.findById(req.params.id)
    if (!task) return next(new ErrorResponse(404, `Task not found with id of ${req.params.id}`))

    res.status(200).send({ success: true, data: task })
    console.log("The Task has been fetched successfully".green)
})

//@desc     Create a new task
//@route    POST /api/v1/Tasks
//@access   Private

const createTask = asyncHandler(async (req, res) => {
    const task = await Task.create({ ...req.body, user: req.user.id })
    res.status(201).send({ success: true, data: task })
    console.log("The task has been created successfully".green)
})

//@desc     Update a task
//@route    PUT /api/v1/Tasks/:id
//@access   Private
const updateTask= asyncHandler(async (req, res, next) => {
    let task = await Task.findById(req.params.id)
    if (!task) return next(new ErrorResponse(404, `task not found with id of ${req.params.id}`))

    if (task.user.toString() !== req.user.id) {
        return next(new ErrorResponse(401, "You are not authorized to update this task"))
    }
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).send({ success: true, data: task })
    console.log("The Tasks has been updated successfully".green)
})

//@desc     Delete a task
//@route    DELETE /api/v1/Tasks/:id
//@access   Private
const deleteTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id)
    if (!Task) return next(new ErrorResponse(404, `task not found with id of ${req.params.id}`))

    if (task.user.toString() !== req.user.id) {
        return next(new ErrorResponse(401, "You are not authorized to delete this task"))
    }

    task.remove()
    res.status(200).send({ success: true })
    console.log("The tasks has been deleted successfully".green)
})


module.exports = {getTasks, getTask, createTask, updateTask, deleteTask}
