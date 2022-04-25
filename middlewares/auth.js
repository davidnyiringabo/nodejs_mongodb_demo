const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization");
  //console.log('Token......',token.split('Bearer ')[1])
  if (!token) return res.send("token missing..").status(401);
  try {
    const decoded = jwt.verify(
      token.split("Bearer ")[1],
      config.get("jwtPrivateKey")
    );
    //add user to the request body
    req.user = decoded;
    next();
  } catch (err) {
    return res.send("invalid token").status(400);
  }
}
module.exports = auth;
