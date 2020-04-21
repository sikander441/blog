const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    console.log('here')
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
      console.log('in Auth middleware: '+process.env.myprivatekey)
    const decoded = jwt.verify(token, process.env.myprivatekey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};