let express = require('express');
let router = express.Router();
let Survey = require('../routes/survey');

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home',path: 'home'});
}

module.exports.displaySurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/list'});
    // res.render('index', { title: 'Survey',path: 'home'});
}

module.exports.displayAddSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/add'});
}

module.exports.displayEditSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/edit'});
}

createSurvey(){
    Survey.displayAddSurveyPage {
        title: "Survey title",
        ques_and_list : [
            {
                "ques": "What is your favourite food",
                "type": "text"
            },
            {
                "ques": "Do you eat rice?",
                "type": "mcq",
                "options": ["Yes","No","Sometimes"]
            }
        ],
        responses : 0,
        questions: 2,
        created: new Date(),
        updated: new Date()
    } 
}