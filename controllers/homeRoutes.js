const router = require('express').Router();
const { Profloss, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('login', { 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userid, {
      attributes: { exclude: ['password'] },
      include: [{model: Profloss}],
    });
    const proflossData = await Profloss.findAll({
        where:{
            userid: userData.dataValues.id

        }
    })
    const cleaneduparray = proflossData.map((item)=> item.get({plain:true}))
    const user = userData.get({ plain: true });

    res.render('profile', {
      cleaneduparray,
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profiledata', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userid, {
      attributes: { exclude: ['password'] },
      include: [{model: Profloss}],
    });
    const proflossData = await Profloss.findAll({
        where:{
            userid: userData.dataValues.id
            // userData.dataValues.id
        }
    })
    const profiles = proflossData.map((item)=> item.get({plain:true}))
    const user = userData.get({ plain: true });

    // res.render('profile', {
    //   cleaneduparray,
    //   ...user,
    //   logged_in: true
    // });
    res.json(profiles);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
