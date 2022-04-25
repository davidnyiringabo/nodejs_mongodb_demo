const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb successfully...."))
  .catch((err) => console.log("failed to connect to mongodb", err));

//Connecting Node and MongoDB
require("./course.model");
