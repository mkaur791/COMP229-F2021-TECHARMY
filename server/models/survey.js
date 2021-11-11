let mongoose = require('mongoose');

let survey = mongoose.Schema({
    title: String,
    ques_and_list: Array,
    responses: Number,
    questions: Number
},
{
  collection: "survey"
});

module.exports = mongoose.model('survey', survey);
