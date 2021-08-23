const { verifySignUp } = require("../middlewares");
module.exports = app => {
    const weathers = require("../controllers/weather.controller.js");
    // const csvController = require("../controllers/weathers/csv.controller");
    // const upload = require("../middlewares/upload");
    var router = require("express").Router();
    // csv
    // router.post("/upload", upload.single("file"), csvController.upload);
  
    // Create a new Tutorial
    router.post("/", weathers.create);
    // Retrieve all weathers
    router.get("/", weathers.findAll);
    // get date between
    router.get("/:date11",weathers.findDate);
    // Retrieve all published weathers
    router.get("/published", weathers.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", weathers.findOne);
  
    // Update a Tutorial with id  
    router.put("/:id",verifySignUp.checkDuplicateUsernameOrEmail, weathers.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", weathers.delete);
  
    // Delete all weathers
    router.delete("/", weathers.deleteAll);
    
    app.use('/api/date', router);
    app.use("/api/csv2", router);
  };