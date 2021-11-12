let mongoose = require('mongoose');

let Surveys = mongoose.Schema({
    title: String,
    ques_and_list: Array,
    responses: Number,
    questions: Number,
    created: Date,
    updated: Date
},
{
  collection: "survey"
});

module.exports = mongoose.model('Surveys', Surveys);
