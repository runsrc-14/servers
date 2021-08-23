const multer = require("multer");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("vnd.ms-excel")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/client/resources/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-CSV_FILE-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;
