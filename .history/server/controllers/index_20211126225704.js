let Survey = require('../models/survey');
// let router = express.Router();
//-------Toms
let mongoose = require('mongoose');
let passport = require('passport');

//-------Toms
//create the User Model instance
let User = require('../models/user');
let user = User.User;

// display home page
module.exports.displayHomePage = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err){
            return console.error(err);
        }
        else{
            console.log("surveyList",surveyList)
            res.render('index', {title: 'Home',path: 'home',SurveyList:surveyList});
        }
    })
}

// display add/create survey page
module.exports.displayAddSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/add'});
}

// process add survey page
module.exports.processAddSurvey = (req, res, next) => {

    let totalQuestions =  req.body.questionCount
    let title = req.body.title
    let quesData = req.body
    let data=[]

    // creating survey object for database storage
    for(let i=1;i<=totalQuestions;i++){
        let ques = {
            "ques": quesData["question"+i],
            "type": quesData["question"+i+"type"]
        }
        if(quesData["question"+i+"options"]) ques['options'] = quesData["question"+i+"options"]
        data.push(ques)
    }

    let newSurvey = Survey({
        title,
        ques_and_list:data,
        responses:0,
        questions: data.length,
        created: new Date(),
        updated: new Date()
    })

    // create a new survey
    Survey.create(newSurvey ,(err,req,next)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // refresh the survey list
            res.redirect('/');
        }
    })
}

// display edit survey page
module.exports.displayEditSurveyPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit, next) =>{
        if(err){
            console.log(err);
            res.end(err);
        } else {
            console.log('surveyToEdit', surveyToEdit)
            res.render('index', { title: 'Survey',path: 'survey/edit', survey:surveyToEdit});
        }
    })
}

module.exports.deleteSurvey = function(req, res, next){
    let id = req.params.id;
    Survey.remove({_id: id} , (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/');
        }
    })
}

//--------------------------------------------------------------add Tom's
module.exports.displayLoginPage = (req,res,next) => {
    //check if the user is already logged in
    if(!req.user)
    {
        res.render('login',
            {
                title: "Login",
                messages: req.flash('loginMessage'),
                userName : req.user ? req.user.username : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server error
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('login');
        }
        req.login(user, (err) => {
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('survey');
        })
    }
    )(req, res, next);
}

module.exports.displayRegisterPage = (req,res,next) => {
    //check if the user is not already logged in
    if(!req.user)
    {
        res.render('register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            userName : req.user ? req.user.username : ''
        });
    }
    else
    {
        return res.direct('/');
    }
}

module.exports.processRegisterPage = (req,res,next) => {
    //instantiate a user object 
    let newUser = new User({
        username: req.body.username,
        //password hashed in registration
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (user) => {
        if(err)
        {
            console.log("Error: Inserting New User");            
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                userName : req.user ? req.user.username : ''
            })
        }
        else
        {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('survey')
            })
        }
    })
}

module.exports.performLogout = (req,res,next) => {
    req.logout();
    res.redirect('/');
}
