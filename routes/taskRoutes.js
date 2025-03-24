const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description });
        await task.save();


        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const id = req.params.id;
    try {
        await Task.findOneAndUpdate({ _id: id }, { title, description });
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.delete('/delete', async (req, res) => {
    const { _id } = req.query;
    try {
        if (await Task.exists({ _id })) {
            await Task.deleteOne({ _id });
            res.status(200).json({ message: 'Task deleted successfully '});
        } else {
            res.status(500).json({ message: 'Task not exist in db!' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.get('/list', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

module.exports = router;