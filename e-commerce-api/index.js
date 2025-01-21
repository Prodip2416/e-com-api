const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const responseMiddleware = require("./middleware/responseMiddleware");
const { sequelize } = require("./models");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(responseMiddleware);

// Load all routes dynamically
app.use("/api", routes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
