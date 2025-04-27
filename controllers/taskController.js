const User = require('../models/User');

// Create a new task (add to user's tasks array)
exports.createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const user = await User.findById(req.session.user._id);

    const newTask = {
      task_name: description,
      status: "ongoing",
      visible: true
    };

    user.music_settings.tasks.push(newTask);
    await user.save();
    req.session.user = user; // Update session too

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

// Get all tasks for the user
exports.getTasks = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const tasks = user.music_settings.tasks || [];
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Update task status (ongoing -> done or done -> ongoing)
exports.updateTask = async (req, res) => {
  try {
    const { index } = req.params;
    const { status } = req.body;

    const user = await User.findById(req.session.user._id);
    if (!user.music_settings.tasks[index]) {
      return res.status(404).json({ error: "Task not found" });
    }

    user.music_settings.tasks[index].status = status;
    await user.save();
    req.session.user = user; // Update session

    res.status(200).json({ message: "Task updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { index } = req.params;

    const user = await User.findById(req.session.user._id);
    if (!user.music_settings.tasks[index]) {
      return res.status(404).json({ error: "Task not found" });
    }

    user.music_settings.tasks.splice(index, 1); // remove the task
    await user.save();
    req.session.user = user; // Update session

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
