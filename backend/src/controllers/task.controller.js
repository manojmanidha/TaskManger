const Task = require("../models/task.model");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    const task = new Task({
      title,
      description,
      deadline,
    });

    if (req.file) {
      task.file = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// UPDATE
exports.updateTask = async (req, res) => {
  const { id } = req.params;

  const updated = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(updated);
};

// DELETE
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// DOWNLOAD FILE
exports.getFile = async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.set("Content-Type", task.file.contentType);
  res.send(task.file.data);
};