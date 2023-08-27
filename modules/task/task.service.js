const db = require('../../config/db');
const Task = require("./task.model");



module.exports = {
    getAll,
    findId,
    create,
    update,
    _delete
};


async function getAll() {
    const Tasks = await Task.find();
    if (!Tasks) throw 'Task not found';
    return Tasks;
}

async function create(params) {
    const Tasks = await Task.create(params);
    const savedTask = await Tasks.save();
    return savedTask;
}

async function update(id, params) {
    const updatedTask = await Task.findByIdAndUpdate(id, params, { new: true });
    if (!updatedTask) throw 'Task not found';
    return updatedTask;
}

async function findId(id) {
    const Tasks = await Task.findById(id);
    if (!Tasks) throw 'Task not found';
    return Tasks;
}


async function _delete(id) {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) throw 'Task not found';
    return deletedTask;
}