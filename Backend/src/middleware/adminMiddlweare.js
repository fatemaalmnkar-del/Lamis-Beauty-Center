const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      //Authentication required
      message: "Bitte melden Sie sich an."
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      //Admin access required
      
      message: "Sie haben keine Berechtigung für diese Aktion"
    });
  }

  next();
};

module.exports = adminOnly;