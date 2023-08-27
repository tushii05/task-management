const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number }

}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.hash;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('task', taskSchema);
