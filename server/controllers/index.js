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

module.exports.displaySurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/list'});
    // res.render('index', { title: 'Survey',path: 'home'});
}

// display add/create survey page
module.exports.displayAddSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/add'});
}

// process add survey page
module.exports.processAddSurvey = (req, res, next) => {
    console.log("request..", req.body)
}

// display edit survey page
module.exports.displayEditSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/edit'});
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