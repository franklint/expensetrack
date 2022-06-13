const Budget = require('./Budget');
const User = require('./User');
User.hasMany(Budget);


module.exports = {
Budget,User
};