/**
 * All the routes used for user
 */

const express = require("express");
const taskController = require("../../controllers/task.controller");
const taskRouter = express.Router();

// Endpoint to retrieve a list of tasks
taskRouter.get("/tasks", taskController.findAllTasks);

taskRouter.get("/tasks/:id", taskController.findById);

// Endpoint to add a new task
taskRouter.post("/tasks", taskController.create);

taskRouter.put("/tasks/:id", taskController.update);

taskRouter.delete("/tasks/:id", taskController.deleteOne);

module.exports = taskRouter;
