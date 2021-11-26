let express = require('express');
let router = express.Router();
let Survey = require('../models/survey')

// let Survey = require('../routes/survey');

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

// // display register page
// module.exports.displayRegisterPage = (req, res, next) => {
//     res.render('index', { title: 'Sign Up',path: 'register'});
// }

// // display login page
// module.exports.displayLoginPage = (req, res, next) => {
//     res.render('index', { title: 'Sign In',path: 'login'});
// }

module.exports.displayLoginPage = (req,res,next) => {
    // check if user is already logged in
    if(!req.user){
        res.render('index',{title:'Sign In', path:'login',messages:req.flash('loginMessage'),username: req.user? req.user.username : ''})
    }
    else{
        return res.redirect('/');
    }
    
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local', (err,user,info) =>{
        if(err){
            // server error
            return next(err);
        }
        // if there is login error
        if(!user){
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err)=>{
            if(err){
                // server error
                return next(err);
            }
            return res.redirect('/');
        })
    })(req,res,next);
}

module.exports.logoutUser = (req,res,next) => {
    req.logout();
    res.redirect('/')
}