const { verifyEdit } = require("../middlewares");
module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  // const csvController = require("../controllers/tutorials/csv.controller");
  // const upload = require("../middlewares/upload");
  var router = require("express").Router();
  // csv
  // router.post("/upload", upload.single("file"), csvController.upload);

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);
  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id",    [
    verifyEdit.checkDuplicateUsername
  ], tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials 
  router.delete("/", tutorials.deleteAll);

  app.use('/api/usersAll', router);
  // app.use("/api/csv", router);
};
