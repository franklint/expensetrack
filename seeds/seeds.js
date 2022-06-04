const sequelize = require('../config/connection'); 
const {User, Budget, Transaction} = require('../models'); 

const userData = require('./userData.json'); 
const transactData = require('./transactionData.json'); 
const budgetData = require('./budgetData.json'); 

const seedDatabase = async() => {
    await sequelize.sync({ force: true}); 

    const users = await User.bulkCreate(userData, {
        individualHooks: true, 
        returning: true, 
    }); 
    console.log  ('-------------seeded ---------'); 

    const budget = await Budget.bulkCreate(budgetData, {
        individualHooks: true, 
        returning: true, 
    }); 
    console.log (' ------------budget seeded---------'); 

    const transactions = await Transaction.bulkCreate(transactData, { 
        individualHooks: true,
        returning: true,
    }); 
    console.log('----------------transactions seeded-----------'); 

    process.exit(0); 
}; 

seedDatabase(); 