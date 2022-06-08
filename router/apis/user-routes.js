const router = require('express').Router(); 
const res = require('express/lib/response');
const { User } = require('../../models'); 

//this is the user login page 

router.post('/', async (req, res) => {
    try{ 
        const userData = await User.create(req.body); 
        
        req.session.save( ()=> {
            req.session.user_id = userData.id; 
            req.session.logged_in = true; 

            res.status(200).json(userData); 
        }); 
    } catch(err) { 
        res.status(400).json(err); 
    }
}); 

router.get('/', async(req, res) => { 
    try { 
        const userData = await User.findAll({}); 
        res.status(200).json(userData); 
    }catch(err) {
        res.status(500).json(err); 
    }
}); 

router.post('/register', async (req, res) => {
     try { 
         const newUserData = await User.create(req.body); 
         res.status(200).json(newUserData); 
     } catch (err) {
         res.status(400).json(err); 
         console.log(err); 
     }
}); 

router.post('/login', async(req, res)=> {
    
})