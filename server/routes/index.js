let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET add survey page. */
router.get('/add', indexController.displayAddSurveyPage);

/* process add survey page. */
router.post('/add', indexController.processAddSurvey);

/* GET edit survey page. */
router.get('/edit/:id', indexController.displayEditSurveyPage);

/* GET route for deleting a survey. */
router.get('/delete/:id',indexController.deleteSurvey)

/* GET register page. */
router.get('/register', indexController.displayRegisterPage);

/* GET login page. */
router.get('/login', indexController.displayLoginPage);

/* process add survey page. */
router.post('/add', indexController.processAddSurvey);

/* GET edit survey page. */
router.get('/edit/:id', indexController.displayEditSurveyPage);

/* GET route for deleting a survey. */
router.get('/delete/:id',indexController.deleteSurvey)

module.exports = router;


/* LG - may need to update 11/02/21 */