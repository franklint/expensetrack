const router = require('express').Router(); 
const res = require('express/lib/response');
const { Category, Expenses} = require('../../models'); 

//GET categories
//try better is better https://www.toptal.com/express-js/routes-js-promises-error-handling 
router.get('/', async (req, res) => {
    try { 
        const categoryData = await Category.findAll(); 
        res.status(200).json(categoryData); 
    } catch (err) {
        res.status(500).json(err); 
    }
}); 

//GET a specific cateogry by id 
//https://sequelize.org/docs/v6/core-concepts/model-querying-finders/ ; findbyPK 

router.get('/:id', async(req, res) => { 
    try { 
        const categoryData = await Category.findByPk(req.params.id, { 
            where: {
                id: req.params.id, 
            }, 
            include: {
                model: Expenses, 
                attributes: ['category_id'], 
            }, 
        });
        
        if(!categoryData) {
            res.status(404).json({ message: 'No categry found with this id'}); 
            return; 
        } 
        res.status(200).json(categoryData); 
    } catch (err) {
        res.status(500).json(err); 
    }
});

//CREATE a new category 
router.post('/', async( req, res) => {
    try { 
        const categoryData = await Category.create(req.body);  
        res.status(200).json(categoryData)
    } catch (err) {
        res.status(404).json(err); 
    }
}); 

//update a category 
router.put('/:id', async(req, res) => {
    try {
        const categoryData = await Category.update(
            {
                category_name: req.body.category_name, 
            },
            {
                where: {
                    id: req.params.id, 
                }, 
            }
        ); 
        if(!categoryData) {
            res.status(404).json({ message: 'No category found with this id!'}); 
            return; 
        }

        res.status(200).json(categoryData); 
    } catch (err){ 
        res.status(500).json(err);
    }
}); 

//CREATE new category 
router.post ('/', async (req, res)=>{
    try{ 
        const categoryData = await Category.create(req.body); 
        res.status(200).json(categoryData);
    } catch(err) { 
        res.status(404).json(err); 
    }
}); 

//UPDATE a category 
router.put('/:id', async(req, res)=> {
    try{ 
        const categoryData = await Category.update(
            {
                category_name: req.body.category_name, 
            }, 
            {
                where: { 
                    id: req.params.id, 
                }, 
            }
        ); 

        if(!categoryData) {
            res.status(404).json({ message: 'No category found with this id!'}); 
            return; 
        }

        res.status(200).json(categoryData);
    } catch(err) {
        console.log(err); 
        res.status(500).json(err); 
    }
}); 

//DELETE a caategory 
router.delete('/:id', async(req, res) => {
    try { 
        const categoryData = await Category.destroy({
            where: { 
                id: req.params.id,
            },
        }); 

        if(!categoryData){
            res.status(404).json({ message: 'No category found with this id!'}); 
            return; 
        }

        res.status(200).json(categoryData); 
    } catch(err) {
        res.status(500).json(err); 
    }
}); 

module.exports = router; 
