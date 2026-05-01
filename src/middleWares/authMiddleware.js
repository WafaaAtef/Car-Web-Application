const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ msg: 'Wrong Token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Wrong Token' });
  }
};

module.exports = { auth };
