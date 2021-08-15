const express = require('express');
const router = express.Router();

//Import controller
const taskController = require('../controllers/tasks')

router.route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)

router.route('/:_id')  
    .get(taskController.getTaskById)
    .delete(taskController.deleteTask)
    .put(taskController.putTask)

module.exports = router;
