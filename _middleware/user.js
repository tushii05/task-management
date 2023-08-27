// const jwt = require('express-jwt');
// const db = require('../config/db');


// module.exports = { user };
// function user() {
//     return [
//         jwt({ secret: process.env.SECRETSTRING, algorithms: ['HS256'] }),
//         async (req, res, next) => {
//             const user = await db.User.findOne({ where: { id: req.user.sub } });
//             if (!user)
//                 return res.status(401).json({ message: 'Unauthorized' });
//             req.user = user.get();
//             next();
//         }
//     ];
// }


const jwt = require('jsonwebtoken');

function requireToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorised' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRETSTRING);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = requireToken;
