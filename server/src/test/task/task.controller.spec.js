const { v4: uuidv4 } = require("uuid");

const taskController = require("../../controllers/task.controller");
const response = require("../../commons/response");
let { taskArray } = require("../../commons/dbhelper");

/* ------- unit testing for find All Tasks --------- */
describe("findAllTasks function", () => {
  let req, res, next;
  beforeEach(() => {
    taskArray.push({
      title: "NFB Test task tracker 1",
      description: "New task added to list 1",
      status: "done",
      id: "5836ea95-a215-4d51-b184-e93afc3ae157",
      createdAt: 1707968508649,
      updatedAt: 1707968508649,
    });
    req = {};
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return all tasks", async () => {
    const result = await taskController.findAllTasks(req, res, next);

    console.log(result);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      status: 200,
      msg: "get task success",
      data: taskArray,
    });

    expect(next).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});

/* ------- unit testing for create task --------- */
// describe("create function", () => {
//   let taskArray = [];

//   it("should create a new task", async () => {
//     const req = {
//       body: {
//         title: "New Task",
//         description: "Description",
//         status: "pending",
//       },
//     };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.create(req, res, next);

//     expect(taskArray.some(task => task.title === req.body.title)).toBe(true);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Task created successfully",
//       tasks: taskArray,
//     });
//     expect(next).not.toHaveBeenCalled();
//   });

//   it("should return an error if task title already exists", async () => {
//     const existingTask = taskArray[0];
//     const req = {
//       body: {
//         title: existingTask.title,
//         description: "Description",
//         status: "pending",
//       },
//     };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.create(req, res, next);

//     expect(res.json).toHaveBeenCalledWith({ error: "Task already exists!!" });
//     expect(next).not.toHaveBeenCalled();
//   });
// });

/* ------- unit testing for update task --------- */
// describe("update function", () => {
//   let taskArray = [
//     {
//       title: "NFB Test task tracker 1",
//       description: "New task added to list 1",
//       status: "done",
//       id: "5836ea95-a215-4d51-b184-e93afc3ae157",
//       createdAt: 1707968508649,
//       updatedAt: 1707968508649,
//     },
//   ];

//   it("should update an existing task", async () => {
//     const taskId = taskArray[0].id;
//     const req = { params: { id: taskId }, body: { status: "done" } };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.update(req, res, next);

//     expect(taskArray.find(task => task.id === taskId).status).toBe("done");
//     expect(res.json).toHaveBeenCalledWith({
//       message: "update task success.",
//       tasks: taskArray,
//     });
//     expect(next).not.toHaveBeenCalled();
//   });

//   it("should return an error if task does not exist", async () => {
//     const taskId = "non-existing-id";
//     const req = { params: { id: taskId }, body: { status: "done" } };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.update(req, res, next);

//     expect(res.json).toHaveBeenCalledWith({ error: "Task doesnot exists!!" });
//     expect(next).not.toHaveBeenCalled();
//   });
// });

/* ------- unit testing for find task by id --------- */
// describe("findById function", () => {
//   let taskArray = [
//     {
//       title: "NFB Test task tracker 1",
//       description: "New task added to list 1",
//       status: "done",
//       id: "5836ea95-a215-4d51-b184-e93afc3ae157",
//       createdAt: 1707968508649,
//       updatedAt: 1707968508649,
//     },
//   ];

//   it("should return a task by id", async () => {
//     const taskId = taskArray[0].id;
//     const req = { params: { id: taskId } };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.findById(req, res, next);

//     expect(res.json).toHaveBeenCalledWith({
//       message: "Get task by id success!!",
//       task: taskArray[0],
//     });
//     expect(next).not.toHaveBeenCalled();
//   });

//   it("should return an error if task does not exist", async () => {
//     const taskId = "non-existing-id";
//     const req = { params: { id: taskId } };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.findById(req, res, next);

//     expect(res.json).toHaveBeenCalledWith({ error: "Task doesnot exists!!" });
//     expect(next).not.toHaveBeenCalled();
//   });
// });

/* ------- unit testing for deleteTask --------- */
// describe("deleteOne function", () => {
//   let taskArray = [
//     {
//       title: "NFB Test task tracker 1",
//       description: "New task added to list 1",
//       status: "done",
//       id: "5836ea95-a215-4d51-b184-e93afc3ae157",
//       createdAt: 1707968508649,
//       updatedAt: 1707968508649,
//     },
//   ];

//   it("should delete an existing task", async () => {
//     const taskId = taskArray[0].id;
//     const req = { params: { id: taskId } };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.deleteOne(req, res, next);

//     expect(taskArray.some(task => task.id === taskId)).toBe(false);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Delete task success!!",
//       tasks: taskArray,
//     });
//     expect(next).not.toHaveBeenCalled();
//   });

//   it("should return an error if task does not exist", async () => {
//     const taskId = "non-existing-id";
//     const req = { params: { id: taskId } };
//     const res = { json: jest.fn() };
//     const next = jest.fn();

//     await taskController.deleteOne(req, res, next);

//     expect(res.json).toHaveBeenCalledWith({ error: "Task not found" });
//     expect(next).not.toHaveBeenCalled();
//   });
// });
