const express = require('express'); 
const session = require('express-session'); 
//handlebars const should go here 

//// 

const sequelizeStore = require('connect-session-sequelize')(session.Store); 
const path = require('path'); 
const sequelize = require('./config/connection');
const routes = require('./router'); 
const helpers = require('./utils/helpers'); 

const app = express(); 
const port = process.env.PORT || 3001; 

const secretSession = { 
    secret: "Super secret secret", 
    cookie: {}, 
    resave: false, 
    saveUnitialized: true, 
    store: new sequelizeStore({
        db: sequelize, 
    }),
}; 

app.use(session(secretSession)); 

//handle bars created here 

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(routes); 

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, ()=> {
        console.log(`App listening on port ${PORT}`); 
    }); 
    console.log('we good!!!!!'); 
})
