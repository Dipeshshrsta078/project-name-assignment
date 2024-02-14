const { taskArray } = require("../commons/dbhelper");
const { v4: uuidv4 } = require("uuid");
const Response = require("../commons/response");
/**

 * This function gets all the tasks
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function findAllTasks(req, res, next) {
  console.log("================================", taskArray);
  try {
    Response.successResponse(res, "Get tasks success", taskArray);
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
    console.log("creating new task");
    task.id = uuidv4();
    if (taskArray.includes(task.title)) {
      return Response.errorResponse(res, "Task already exists!!");
    }
    task.createdAt = Date.now();
    task.updatedAt = Date.now();
    const newTask = await taskArray.push(task, userModel);
    const msg = "Task created successfully";
    console.log(msg);
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
    const isExistinTask = await taskArray.find(item => {
      item.id === taskId;
    });
    if (!isExistinTask) {
      return Response.errorResponse(res, "Task doesnot exists!!");
    }
    console.log(`updating task with id:${taskId}`);
    const newTask = await taskArray.forEach(element => {
      if (element.id === taskId) {
        element = updateData;
      }
    });
    Response.successResponse(res, `update task success.`, newTask);
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
  const id = req.params.id;
  try {
    const task = await taskArray.find(item => item.id === id);
    const msg = "Get task by id success!!";
    console.log(msg);
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
    const userData = await taskArray.pop(taskId, userModel, {
      isDeleted: false,
    });
    if (!userData) {
      return Response.errorResponse(res, "Task not found");
    }
    await userService.deleteOne(taskId, userData);
    const msg = "Delete task success!!";
    console.log(msg);
    Response.successResponse(res, msg);
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
