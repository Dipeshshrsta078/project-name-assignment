const { v4: uuidv4 } = require("uuid");
const Response = require("../commons/response");
let { taskArray } = require("../commons/dbhelper");
/**

 * This function gets all the tasks
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function findAllTasks(req, res, next) {
  try {
    res.json({
      success: true,
      status: 200,
      msg: "get task success",
      data: taskArray,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

/**
 * This function create the new task
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function create(req, res, next) {
  let task = req.body;
  try {
    task.id = uuidv4();
    if (task.title === "") {
      return Response.errorResponse(res, "Task cannot be empty.");
    }

    task.createdAt = Date.now();
    task.updatedAt = Date.now();
    const newTask = taskArray.push(task);
    const msg = "Task created successfully";
    return Response.successResponse(res, msg, newTask);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

/**
 * This function updates the task with given id
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */

async function update(req, res, next) {
  const taskId = req.params.id;
  const updateData = req.body;
  try {
    const existingTaskIndex = taskArray.findIndex(item => item.id === taskId);
    if (existingTaskIndex === -1) {
      return Response.errorResponse(res, "Task doesnot exists!!");
    }
    taskArray[existingTaskIndex] = {
      ...taskArray[existingTaskIndex],
      ...updateData,
    };

    Response.successResponse(res, `Update task success.`, taskArray);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

/**
 *
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next next function
 */

async function findById(req, res, next) {
  const taskId = req.params.id;
  try {
    const task = taskArray.find(item => item.id === taskId);
    if (!task) {
      return Response.errorResponse(res, "Task doesnot exists!!");
    }
    const msg = "Get task by id success!!";
    Response.successResponse(res, msg, task);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

/**
 *
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next next function
 */

async function deleteOne(req, res, next) {
  const taskId = req.params.id;
  try {
    const taskIndex = taskArray.findIndex(item => item.id === taskId);
    if (taskIndex === -1) {
      return Response.errorResponse(res, "Task not found");
    }
    taskArray.splice(taskIndex, 1);

    const msg = "Delete task success!!";
    Response.successResponse(res, msg, taskArray);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
const taskController = {
  findAllTasks,
  findById,
  create,
  update,
  deleteOne,
};

module.exports = taskController;
