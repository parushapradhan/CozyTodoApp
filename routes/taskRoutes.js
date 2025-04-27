const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task Routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
