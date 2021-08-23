const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
checkDuplicateUsername = (req, res, next) => {
    // Username
    const id = req.params.id;
    // res.send(id)
    User.findOne({
        where: {
            username: {
                [Op.eq]: req.body.username
            },
            id: {
                [Op.ne]: id
            }
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "ชื่อผู้ใช้งานถูกใช้งานแล้ว"
            });
            return;
        }
        // email
        User.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email
                },
                id: {
                    [Op.ne]: id
                }
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "อีเมลล์นี้ถูกใช้งานแล้ว"
                });
                return;
            }
            next();
        });
    });

    // email

};


const verifyEdit = {
    checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifyEdit;
