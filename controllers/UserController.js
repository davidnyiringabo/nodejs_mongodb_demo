//Import the dependencies
const hashPassword = require("../utils/hash");
const _ = require("lodash");
const express = require("express");
const { User, validate } = require("../model/user.model");
//Creating a Router
var router = express.Router();

//get users
router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });

  return res.send(users);
});
router.get("/:email", async (req, res) => {
  const users = await User.find({ email: req.params.email });
  return res.send(users);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.send(error.details[0].message).status(400);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.send("User already registered").status(400);

  /* user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: true,
  }); */
  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const hashed = await hashPassword(user.password);
  user.password = hashed;
  await user.save();
  //return res.send(user).status(201);
  return res
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]))
    .status(201);
});

module.exports = router;
