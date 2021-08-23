module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id:{ 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname:{
      type: Sequelize.STRING
    },
    lastname:{
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return User;
};
