const User = require('./User');
const Budget = require('./Budget');
User.hasMany(Budget); 


module.exports = { Budget, User};