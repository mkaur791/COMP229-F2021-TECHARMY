let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET survey page. 
survey list will be on home page
*/
router.get('/survey', indexController.displaySurveyPage);

/* GET add survey page. */
router.get('/add', indexController.displayAddSurveyPage);

/* GET edit survey page. */
router.get('/edit', indexController.displayEditSurveyPage);


module.exports = router;


/* LG - may need to update 11/02/21 */