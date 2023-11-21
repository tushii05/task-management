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




//-------------------Another Options 

function authenticateToken(req, res, next) {
  const token1 = req.header("Authorization");
  const token = token1.split(" ")[1];

  console.log(token.split(" ")[1]);
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  try {
    const decoded = jwt.verify(token, SECRETSTRING);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
}
