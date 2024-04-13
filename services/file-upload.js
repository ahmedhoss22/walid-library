const multer = require("multer");
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const storeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    if (file) {
      let fileExt = path.extname(file.originalname)
      cb(null, uuidv4() + fileExt)
    } else {
      cb(null, false)
    }
  },
});

const fileUpload = multer({
  storage: storeStorage,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit to 5MB
});


module.exports = { fileUpload }
