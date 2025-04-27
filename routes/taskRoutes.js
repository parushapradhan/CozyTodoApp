const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// All task-related routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.put('/tasks/:index', taskController.updateTask);
router.delete('/tasks/:index', taskController.deleteTask);

module.exports = router;
