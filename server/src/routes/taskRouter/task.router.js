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
// => {
//   const { title } = req.body;
//   if (!title) {
//     return res.status(400).json({ error: 'Title is required' });
//   }

//   const newTask = {
//     id: tasks.length + 1,
//     title,
//     completed: false
//   };

//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// Endpoint to mark a task as completed
taskRouter.put("/tasks/:id", taskController.update);
//  => {
//   const id = parseInt(req.params.id);
//   const task = tasks.find(task => task.id === id);
//   if (!task) {
//     return res.status(404).json({ error: 'Task not found' });
//   }

//   task.completed = true;
//   res.json(task);
// });

// Endpoint to delete a task
taskRouter.delete("/tasks/:id", taskController.deleteOne);
//  => {
//   const id = parseInt(req.params.id);
//   tasks = tasks.filter(task => task.id !== id);
//   res.sendStatus(204);
// });
module.exports = taskRouter;
