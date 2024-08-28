const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.UNIQ_KEY, (err, user) => {
      if (err) {
        res.status(500).json({ message: "Access Denied" });
      } else {
        req.User=user
        
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
};

module.exports = verifyToken;
