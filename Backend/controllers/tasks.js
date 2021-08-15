const Task = require('../models/task');

const getAllTasks = async (req, res, next) => {
    console.log("entro")
    const task = await Task.find();
    res.status(200).json(task)
};

const createTask = async (req, res, next) => {
    const newTask = new Task(req.body);
    try {
        const task = await newTask.save();
        res.status(201).json(task);
    }
    catch(error) {
        error.status(400)
        next(error)
    }

};

const deleteTask = async (req, res, next) => {
    const taskId = req.params;
    try {
        await Task.findByIdAndRemove(taskId);
        res.status(200).json({ success: true });
        
    } catch(error) {
        error.status = 400;
        next(error);
    }
};

const putTask = async (req, res) => {
    const taskId = req.params;
    const newTask = req.body;
    try {
        await Task.findByIdAndUpdate(taskId, newTask);
        res.status(200).json({ success: true });
        
    } catch(error) {
        error.status = 400;
        next(error);
    }
};
const getTaskById = async(req, res, next) => {
    const taskId = req.body._id
    try {
        await Task.findById(taskId);
        res.status(200).json({ success: true });
    } catch(error) {
        error.status = 400;
        next(error)
    }
}

module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    putTask,
    getTaskById
}