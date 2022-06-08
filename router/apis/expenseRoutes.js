const router = require('express').Router(); 
const req = require('express/lib/request');
const { Expense, Category, Budget} = require('../../models'); 

//GET all expenses 
router.get('/', async(req, res) => {
    try {
        const expenseData = await Expense.findAll(); 
        res.status(200).json(expenseData); 
    } catch(err){ 
        res.status(500).json(err); 
    }
}); 

//GET ONE expense 
router.get('/', async(req, res) => {
    try{
        const expenseData = await Expense.findByPk(req.params.id, { 
            where: {
                id: req.params.id, 
            }, 
            include: { 
                model: Category, 
                attributes: ['category_id'], 
            }, 
        });

        if(!expenseData) {
            res.status(404).json({ message: 'No expense found with ID'}); 
            return; 
        }

        res.status(200).json(expenseData); 
    } catch (err) {
        res.status(500).json(err); 
    }
}); 

module.exports = router; 