'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameHistory.belongsTo(models.UserGame, {foreignKey: 'UserGameId'})
    }
  }
  UserGameHistory.init({
    UserGameId: DataTypes.INTEGER,
    playing_time: DataTypes.DATE,
    result: DataTypes.ENUM('WIN', 'DRAW', 'LOSE')
  }, {
    sequelize,
    modelName: 'UserGameHistory',
  });
  return UserGameHistory;
};