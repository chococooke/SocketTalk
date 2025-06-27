"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsToMany(models.User, { through: models.UserGroup });
      Group.hasMany(models.Message);
      Group.belongsTo(models.User, { foreignKey: "createdByUserId" });
    }
  }
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      createdByUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
