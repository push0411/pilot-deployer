const jwt = require('jsonwebtoken');
require('dotenv').config();
// Middleware to check if token is valid
exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']; // lowercase
    // console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: 'Token missing or malformed' });
    }

    const token = authHeader.split(" ")[1]; // Extract actual token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);
    // console.log(req.user);
    req.user = decoded; // decoded usually contains userId, role, etc.
    // console.log(req);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Middleware to restrict access to specific roles
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role: ${req.user.role}`,
      });
    }
    next();
  };
};
