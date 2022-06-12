const Profloss = require('./Profloss');
const User = require('./User');
User.hasMany(Profloss);


module.exports = {
Profloss,User
};