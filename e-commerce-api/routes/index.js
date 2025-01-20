const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

// Automatically load all route files in the current directory
fs.readdirSync(__dirname)
  .filter((file) => file.endsWith("Routes.js") && file !== "index.js")
  .forEach((file) => {
    const route = require(path.join(__dirname, file));
    const routeName = file.replace("Routes.js", ""); // Remove "Routes.js" from the filename
    router.use(`/${routeName}`, route); // Use the route file
  });

module.exports = router;
