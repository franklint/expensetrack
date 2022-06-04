const express = require('express'); 
const session = require('express-session'); 
//handlebars const should go here 

//// 

const sequelizeStore = require('connect-session-sequelize')(session.Store); 
const path = require('path'); 