const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated
exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach only necessary fields to `req.user`
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Middleware to check if user is an admin or superadmin
exports.admin = (req, res, next) => {
  const allowedRoles = ["admin", "superadmin"];
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied, administrative privileges required" });
  }
  next();
};