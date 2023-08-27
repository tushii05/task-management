const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_URI, connectionOptions);

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('MongoDB connection successful  ds');
});


function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

const users = require('../modules/users/user.model');

const task = require('../modules/task/task.model');

module.exports = {
    users,
    // task,
    isValidId
};