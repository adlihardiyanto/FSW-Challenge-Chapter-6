'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameBio.belongsTo(models.UserGame, {foreignKey: 'UserGameId'})
    }
  }
  UserGameBio.init({
    UserGameId: DataTypes.INTEGER,
    dob: DataTypes.DATEONLY,
    pob: DataTypes.STRING,
    city: DataTypes.STRING,
    gender: DataTypes.ENUM('Male','Female')
  }, {
    sequelize,
    modelName: 'UserGameBio',
  });
  return UserGameBio;
};