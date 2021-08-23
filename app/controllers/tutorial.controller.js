const { ROLES } = require("../models");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const User_ro = db.user_roles;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "เพิ่มเรียบร้อย" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!123" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const users = req.query.users;
//   var condition = users ? { users: { [Op.like]: `%${users.user.id}%` } } : null;

//   User.findAll({ where: condition })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };

// select all users
exports.findAll = (req, res) => {
  User.findAll({
    include: {
      model: User_ro, where: {
        roleId: {
          [Op.ne]: 3
        }
      }
    }
  })
    .then((data) => {
      res.send(data);
    })
};
//
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    // req.body.password:bcrypt.hashSync(req.body.password, 8),
    where: {
      id: id
    },
  })
    .then((user) => {
      if (user == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      }
      else {
        res.send({
          message: `Cannot update    with id=${id}. Maybe    was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users.",
      });
    });
};

// find all published User
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users.",
      });
    });
};
