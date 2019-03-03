const admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send("Not Authenticated");
  }

  next();
};

module.exports = admin;
