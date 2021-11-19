// let express = require('express');
// let router = express.Router();

// let indexController = require('../controllers/index');

// /* GET home page. */
// router.get('/', indexController.displayHomePage);

// /* GET home page. */
// router.get('/home', indexController.displayHomePage);

// /* GET survey page. 
// survey list will be on home page
// */
// router.get('/survey', indexController.displaySurveyPage);
// // router.get('/home', indexController.displaySurveyPage);

// /* GET add survey page. */
// router.get('/add', indexController.displayAddSurveyPage);

// /* GET edit survey page. */
// router.get('/edit', indexController.displayEditSurveyPage);

// //modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Surveys = require('../models/survey');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('/index', {
    title: 'Home',
    survey: ''
   });
});


module.exports = router;


/* LG - may need to update 11/02/21 */