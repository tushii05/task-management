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
