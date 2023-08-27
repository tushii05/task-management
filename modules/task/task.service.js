const db = require('../../config/db');
const Task = require("./task.model");



module.exports = {
    getAll,
    findById,
    create,
    update,
    _delete
};


async function getAll({ offset = 0, limit = 100, orderBy = 'id', orderType = 'desc', search = null }) {
    const regex = new RegExp(search, 'i');
    const Tasks = await Task.find({ name: regex })
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .sort({ [orderBy]: orderType });
    return Tasks;
}

async function create(params) {
    console.log(params)
    const Task = new db.Task(params);
    console.log(Task,"Task")
    const savedTask = await Task.save();
    return savedTask;
}

async function update(id, params) {
    const updatedTask = await Task.findByIdAndUpdate(id, params, { new: true });
    if (!updatedTask) throw 'Task not found';
    return updatedTask;
}

async function findById(id) {
    const Task = await Task.findById(id);
    if (!Task) throw 'Task not found';
    return Task;
}


async function _delete(id) {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) throw 'Task not found';
    return deletedTask;
}