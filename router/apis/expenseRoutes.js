const router = require('express').Router();
const req = require('express/lib/request');
const {Budget } = require('../../models');
const withAuth = require('../../utils/auth'); 

// Get all expenses
router.post('/newexpense', withAuth, async (req, res) => {
  try { 
    const newExpense = await Budget.create({
      ...req.body, 
      userid: req.session.userid, 
    }); 
    res.status(200).json(newExpense); 
  } catch (err) {
    res.status(400).json(err); 
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const budgetData = await Budget.destroy({
      where: { 
        is: req.params.id, 
        userid: req.session.userid, 
      },
    });

    if(!budgetData) {
      res.status(404).json({ message: 'No budgets found with this id'}); 
      return; 
    }
    res.status(200).json(budgetData); 
  } catch (err) {
    res.status(500).json(err); 
   }
});

module.exports = router;