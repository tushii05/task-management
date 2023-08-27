const express = require('express');
const router = express.Router();
const Task = require('./task.model');
const TasksService = require('./task.service');
const requireToken = require('../../_middleware/user')

router.get('/',requireToken, getAll);
router.post('/store',requireToken, store);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


async function getAll(req, res, next) {
    const { count = 0, limit = 100 } = req.query;
    const queryLimit = parseInt(limit);
    Task.find()
        .limit(queryLimit)
        .then(data => res.json({ message: 'Success', data }))
        .catch(next);
}


async function store(req, res, next) { 
    Task.create(req.body)
        .then(data => res.json({ message: 'Success', data }))
        .catch(next);
}


function getById(req, res, next) {
    TasksService.findById(req.params.id)
        .then(data => res.json({ message: 'Success', data }))
        .catch(next);
}


async function update(req, res, next) {
    try {
        const taskId = req.params.id;
        const updatedTask = await update(taskId, req.body);
        res.json({ message: 'Success', data: updatedTask });
    } catch (error) {
        
    }
}


function _delete(req, res, next) {
    Task.findByIdAndDelete(req.params.id)
        .then(data => res.json({ message: 'Successful Deleted' }))
        .catch(next);
}