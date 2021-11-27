let mongoose = require('mongoose');

let Surveys = mongoose.Schema({
    title: String,
    ques_and_list: Array,
    responses: Number,
    questions: Number,
    created: Date,
    updated: Date,
    userid: String
},
{
  collection: "survey"
});

module.exports = mongoose.model('Surveys', Surveys);

//added might not need: 
let express = require('express');
let router = express.Router();
let Survey = require('../models/survey')

let passport = require('passport');