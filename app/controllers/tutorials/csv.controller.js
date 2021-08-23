const db = require("../../models");
const Tutorial = db.weathers;
const fs = require("fs");
const csv = require("fast-csv");
const CsvParser = require("json2csv").Parser;

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
    let path = __basedir + "/client/resources/uploads/" + req.file.filename;
    
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        tutorials.push(row);
      })
      .on("end", () => {
        Tutorial.bulkCreate(tutorials)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file " +""+ req.file.originalname+""+ " successfully: ",
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = {
  upload,
};
