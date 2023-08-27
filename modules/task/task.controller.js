const express = require('express');
const router = express.Router();
const TasksService = require('./task.service');
const requireToken = require('../../_middleware/user')

router.get('/', getAll);
router.post('/store', requireToken, store);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


async function getAll(req, res, next) {
    TasksService.getAll()
        .then(data => res.json({ message: 'Success', data }))
        .catch(next);
}


async function store(req, res, next) {
    TasksService.create(req.body)
        .then(data => res.json({ message: 'Success', data }))
        .catch(next);
}


function getById(req, res, next) {
    TasksService.findId(req.params.id)
        .then(data => res.json({ message: 'Success', data }))
        .catch(next);
}


function update(req, res, next) {
    TasksService.update(req.params.id, req.body)
        .then(data => res.json({ message: 'Successful Update', data }))
        .catch(next);
}

function _delete(req, res, next) {
    TasksService._delete(req.params.id)
        .then(data => res.json({ message: 'Successful Deleted' }))
        .catch(next);
}