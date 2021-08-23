const db = require("../models");
const Weather = db.weathers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.STA) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const weather = {
    STA: req.body.STA,
    Date: req.body.Date,
    // Precip:	req.body.Precip,
    // WindGustSpd: req.body.WindGustSpd,
    MaxTemp: req.body.MaxTemp,
    MinTemp: req.body.MinTemp,
    MeanTemp: req.body.MeanTemp,
    // Snowfall:	req.body.Snowfall,
    // PoorWeather: req.body.PoorWeather,
    // title: req.body.title,
    // MO: req.body.MO,
    // DA: req.body.DA,
    // PRCP: req.body.PRCP,
    // DR: req.body.DR,
    // SPD: req.body.SPD,
    // MAX: req.body.MAX,
    // MIN: req.body.MIN,
    // MEA: req.body.MEA,
    // SNF: req.body.SNF,
  };

  // Save weather in the database
  Weather.create(weather)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the weather.",
      });
    });
};

// Retrieve all weathers from the database.
exports.findAll = (req, res) => {
  //   const title = req.query.title;
  //   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  // { where: condition }
  Weather.findAll({
    // where: {
    //   Date: {
    //     [Op.between]:['1942-07-01','1942-07-08']
    //   }
    // }
  })
    .then((data) => {
      res.status(200).json(data)

      // res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weathers.",
      });
    });
};
exports.findDate = (req, res) => {
  const start = req.params.date11.split(',');
  Weather.findAll({
    where: {
      // Date:{
      Date: {
        [Op.between]: [start[0], start[1]],
      }

      // }
    }
  })
    .then((data) => {

      res.status(200).json(data)
      // res.send(start)
      // res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weathers.",
      });
    });
};
// .then((result) =>  res.status(200).json({data : result}))
// Find a single weather with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Weather.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving weather with id=" + id,
      });
    });
};

// Update a weather by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  // res.send({ message: req.body });
  Weather.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "weather was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update weather with id=${id}. Maybe weather was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating weather with id=" + id,
      });
    });
};

// Delete a weather with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Weather.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "weather was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete weather with id=${id}. Maybe weather was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete weather with id=" + id,
      });
    });
};

// Delete all weathers from the database.
exports.deleteAll = (req, res) => {
  Weather.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} weathers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all weathers.",
      });
    });
};

// find all published weather
exports.findAllPublished = (req, res) => {
  Weather.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weathers.",
      });
    });
};
