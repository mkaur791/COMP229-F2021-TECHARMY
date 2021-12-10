let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the user model
let user = require('../models/user');
let userController = require('../controllers/user');
let {requireAuth} = require('./index')


/* GET register page. */
router.get('/register', userController.displayRegisterPage);

// POST process the User List page and create a new User - CREATE
router.post('/register', userController.processRegister);

/* GET login page. */
router.get('/login', userController.displayLoginPage);
/* POST Login  */
router.post('/login',userController.processLoginPage);

/* GET route for update user profile page. */
router.get('/update',requireAuth,userController.displayUpdateProfilePage)

/* POST route for processing update profile. */
router.post('/update',requireAuth,userController.processUpdateProfilePage)
/* Logout route */
router.get('/logout',userController.logoutUser);

module.exports = router;


