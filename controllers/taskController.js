const Task = require('../models/Task');

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const newTask = new Task({
      userId: req.session.user._id,  // Link task to logged-in user
      description,
      status: 'ongoing',
      visible: true
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add task' });
  }
};

// Get all tasks for current user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.session.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Update task status
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
