//this is the transaction model database 
const {Model, DataTypes} = require('sequelize'); 
const sequelize = require('../config/connection'); 

class Transaction extends Model {} 

Transaction.init(
 {
     id: {
         type: DataTypes.INTEGER,
         allowNull: false, 
         primaryKey: true, 
         autoIncrement: true, 
     }, 
     user_id: { 
         type: DataTypes.INTEGER, 
         references: { 
             model: 'user', 
             key: 'id',
         },
     },
     transaction_name: { 
         type: DataTypes.STRING, 
         allowNull: false, 
     }, 
     transaction_date: { 
         type: DataTypes.STRING, 
         allowNull: false,
     }, 
     amount: { 
         type: DataTypes.DECIMAL, 
         allowNull: false, 
     }, 
     category: { 
         type: DataTypes.STRING,
         allowNull: false, 
     }, 
     is_expense: {
         type: DataTypes.BOOLEAN, 
     }, 
     is_recurring: { 
         type: DataTypes.BOOLEAN, 
     }, 
     recur_date: { 
         type: DataTypes.STRING, 
         allowNull: true, 
     },
 },
 {
     
 }
)