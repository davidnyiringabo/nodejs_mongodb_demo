require("./model/mongodb");
const courseController = require("./controllers/courseController");
const userController = require("./controllers/UserController");
const auth = require("./controllers/auth");
const authMiddleware = require("./middlewares/auth");
const config = require("config");
const admin = require("./middlewares/admin");
//Import the necessary packages
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//swagger documentation
app.use("/swagger-ui.html", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (!config.get("jwtPrivateKey")) {
  console.log("JWT PRIVATE KEY IS NOT DEFINED");
  process.exit(1);
}
//Create a welcome message and direct them to the main page
app.get("/", (req, res) => {
  res.send("Welcome to our app");
});
//Set the Controller path which will be responding the user actions
//app.use('/api/courses', courseController);
app.use("/api/courses", [authMiddleware, admin], courseController);
app.use("/api/users", userController);
app.use("/api/auth", auth);
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
