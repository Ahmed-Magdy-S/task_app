const express = require("express")
const  {getTasks, getTask, createTask, updateTask, deleteTask } = require("../controllers/tasks")
const router = express.Router()
const advancedResults = require("../middlewares/advancedResults")
const Task = require("../models/Task")
const { protect } = require("../middlewares/auth")

router.route("/").get(advancedResults(Task), getTasks).post(protect, createTask)
router.route("/:id").get(getTask).put(protect, updateTask).delete(protect, deleteTask)


module.exports = router
