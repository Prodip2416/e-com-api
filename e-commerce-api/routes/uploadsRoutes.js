const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const uploadsDir = path.join(__dirname, "../uploads");

// Serve image by filename dynamically
router.get("/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const filePath = path.join(uploadsDir, folder, filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath); // Serve the file
  } else {
    res.status(404).send("Image not found");
  }
});

module.exports = router;
