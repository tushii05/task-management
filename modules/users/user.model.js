const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
}, {
    timestamps: true, 
    toJSON: {
        transform: function (doc, ret) {
            delete ret.hash;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('users', userSchema);
