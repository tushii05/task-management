const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/db');

module.exports = {
    register,
    authenticate
};


async function register(params) {
    if (await db.users.findOne({ email: params.email })) {
        throw new Error('Email already registered. Please use a different email address.');
    }
    const users = new db.users(params);
    const hash = await bcrypt.hash(params.password, 10);
    users.password = hash;
    const user = await users.save();
    return user;
}


async function authenticate({ email, password }) {
    const user = await db.users.findOne({ email });
    if (!user) {
        throw 'Email not match please first Registration';
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw 'Password is incorrect';
    }
    const token = jwt.sign({ sub: user._id.toString() }, process.env.SECRETSTRING, { expiresIn: '7d' });
    return { ...user._doc, token };
}