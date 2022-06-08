const router = require('express').Router(); 
const res = require('express/lib/response');
const {Transaction, User} = require('../../models'); 

//GET all transaction for a specific user 
router.get('/:id', async(req, res) => {
    try {
        const allTransactions = await Transaction.findAll({
            include: [{ model: User}],
            where: { user_id: req.params.id }, 
        }); 
        res.status(200).json(allTransactions); 
    } catch(err) {
        res.status(500).json(err);
    }
}); 

//POST creating a new transaction 
router.post('/', async(req, res)=> {
    try{ 
        const newTransactionData = await Transaction.create(req.body); 
        res.status(200).json(newTransactionData); 
    }catch (err) {
        res.status(400).json(err); 
    }
})

///DELETE a trasnaction by ID 
router.delete('/:id', async(req, res) => {
    try { 
        const selectedTransaction = await Transaction.destroy({
            where: {
                id: req.params.id, 
            }, 
        }); 

        if(!categoryData) {
            res.status(404).json({ message: 'No transaction found here'}); 
            return; 
        }
        res.status(200).json(selectedTransaction); 
    } catch(err) {
        res.status(500).json(err); 
    }
}); 

module.exports = router; 