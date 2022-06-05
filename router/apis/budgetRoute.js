const router = require('express').Router(); 
const res = require('express/lib/response');
const {Budget, User} = require('../../models'); 

//get ALL budget Data 
router.get ('/', async (req, res)=> { 
    Budget.findAll(); 
})
    .then(budgetData => res.json(budgetData)) 
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
}); 

//get ONE budget  The findByPk method obtains only a single entry from the table, 
//using the provided primary key.
router.get('/:id', async (req, res) => {
    Budget.findByPk(req.params.id, {
        where: { 
            id: req.params.id, 
        }, 
        include: { 
            model: User, 
            attributes: ['name'], 
        },
    })
        .then(budgetData => {
            if(!budgetData){
                res.status(404).json({message: 'No budget exists with this id'});
                return; 
            }
            res.json(budgetData);
        })
        .catch(err => {
            console.log(err); 
            res.status(500).json(err); 
        });
    }); 

//CREATE a new budget 
router.post('/', async(req, res) => {
    try {
        const budgetData = await Budget.create(req.body); 
        res.status(200).json(budgetData);
    }catch (err) {
        res.status(404).json(err); 
    }
});

//UPDATE a budget 
router.put('/:id', async (req, res) => {
    try {
        const budgetData = await Budget.update(
          {
            total_income: req.body.total_income,
            total_remain: req.body.total_remain,
          },
          {
            where: {
              user_id: req.session.user_id,
            },
          }
        );
    
        if (!budgetData) {
          res.status(404).json({ message: 'No budget found with this id!' });
          return;
        }
    
        res.status(200).json(budgetData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });

//DELETE a budget 
router.delete('/:id', async(req, res) => {
    try {
        const budgetData = await Budget.destroy({
            where: {
                id: req.params.id, 
            },
        }); 

        if(!budgetData) {
            res.status(404).json({ message: 'No budget with this id'}); 
            return; 
        }

        res.status(200).json(budgetData);
    } catch (err) {
        res.status(500).json(err); 
    }
}); 

module.exports = router; 