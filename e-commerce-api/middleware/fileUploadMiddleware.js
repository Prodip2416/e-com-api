const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getFilePath = (routePath) => {
  switch (routePath.toLowerCase()) {
    case "/product":
      return "product/";
    default:
      return "others/";
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const routeSpecificPath = getFilePath(req.route.path);
    const finalPath = path.join(process.env.BASE_PATH, routeSpecificPath);
    fs.mkdirSync(finalPath, { recursive: true });
    cb(null, finalPath);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPG,JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

// multer instance
const fileUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter,
});

module.exports = fileUpload;
