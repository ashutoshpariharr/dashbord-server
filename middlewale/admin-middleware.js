const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user || req.user.isAdmin === undefined) {
      return res.status(403).json({ message: "Access denied. User is not authenticated or isAdmin property is missing." });
    }

    const isAdmin = Boolean(req.user.isAdmin);
    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied. User is not an admin." });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;