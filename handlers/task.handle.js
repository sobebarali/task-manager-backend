const Task = require("../controller/task");

const task = new Task();

async function createTask(req, res) {
  const info = req.body;
  try {
    const addedTask = await task.addTask(info);
    res.status(201).send(addedTask);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
}

async function getAllTask(req, res) {
  try {
    const tasks = await task.getAll();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
}

async function updateTask(req, res) {
  const id = req.params.id;

  const updatedInfo = req.body;

  try {
    await task.editTask(id, updatedInfo);
    return res.status(200).send({
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
}

async function deleteTask(req, res) {
  const id = req.params.id;

  try {
    await task.removeTask(id);

    return res.send({
      message: "task has been deleted",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function getTask(req, res) {
  const id = req.params.id;

  const info = await task.getTaskById(id);

  if (info) {
    res.status(200).send(info);
  } else {
    return res.status(404).send({
      error: "Task does not exist.",
    });
  }
}

async function findTask(req, res) {
  const query = req.params.query;
  try {
    const info = await blog.searchTask(query);
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function findTaskByName(req, res) {
  const name = req.params.name;

  try {
    const info = await task.getTaskByName(name);
    res.status(200).send(info);
  } catch (error) {
    return res.status(404).send({
      error: "Task does not exist.",
    });
  }
}

module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  findTask,
  findTaskByName,
};
