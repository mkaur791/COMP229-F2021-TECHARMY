let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home',path: 'home'});
}

module.exports.displaySurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/list'});
}

module.exports.displayAddSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/add'});
}

module.exports.displayEditSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/edit'});
}