const { Model, DataTypes } = require('sequelize');
const dataTypes = require('sequelize/lib/data-types');
const sequelize = require('../config/connection');

class Budget extends Model {}

Budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userid:{
      type: dataTypes.INTEGER,
      references:{
        model:'user',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget'
  }
);
module.exports = Budget;