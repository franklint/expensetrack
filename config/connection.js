const { Sequelize } = require('sequelize');
const sequelize = require('sequelize'); 
require('dotenv').config(); 

let sequelize; 

//logic for heroku and local db 
if(process.env.JAWSDB_URL){
    sequelize = new sequelize(proces.env.JAWSDB_URL); 
} else { 
    sequelize = new Sequelize (
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PASSWORD, 
        {
            host: 'localhost',
            dialect: 'mysql', 
            port: 3306,
        }
    );
}

module.exports = sequelize; 