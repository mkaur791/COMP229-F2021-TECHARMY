let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET survey page. */
router.get('/survey', indexController.displaySurveyPage);

/* GET add survey page. */
router.get('/add', indexController.displayAddSurveyPage);


module.exports = router;
