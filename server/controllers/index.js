let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home',path: 'home'});
}

module.exports.displaySurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/list'});
}

