let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

// helper function for securing route
function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}
/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET add survey page. */
router.get('/add',requireAuth, indexController.displayAddSurveyPage);

/* process add survey page. */
router.post('/add',requireAuth, indexController.processAddSurvey);

/* GET edit survey page. */
router.get('/edit/:id',requireAuth, indexController.displayEditSurveyPage);

/* GET route for deleting a survey. */
router.get('/delete/:id',requireAuth,indexController.deleteSurvey)

// /* GET route to display all survey page. */
router.get('/allsurvey', requireAuth,indexController.displayAllSurveyPage);



module.exports = router;
