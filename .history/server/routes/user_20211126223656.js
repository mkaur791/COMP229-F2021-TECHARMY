let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// //---------------------toms
// let passport = require('passport');
// //

// define the user model
let user = require('../models/user');
let userController = require('../controllers/user');

// //---------------------toms
// //helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     //check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         return res.redirect('/login')
//     }
// }
// //

/* GET register page. */
router.get('/register', userController.displayRegisterPage);

// POST process the User List page and create a new User - CREATE
router.post('/register', userController.processRegister);

/* GET login page. */
router.get('/login', userController.displayLoginPage);
/* POST Login  */
router.post('/login',userController.processLoginPage);

/* Logout route */
router.get('/logout',userController.logoutUser);

module.exports = router;


