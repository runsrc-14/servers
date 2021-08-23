module.exports = (sequelize, Sequelize) => {
  const User_ro = sequelize.define("user_roles", {
    id:{ 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    roleId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });
  return User_ro;
};
