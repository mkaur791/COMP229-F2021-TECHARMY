let mongoose = require('mongoose');

let survey = mongoose.Schema({
    title: String,
    ques_and_list: Array,
    responses: Number,
    questions: Number,
    createDate: Date,
    updateDate: Date
},
{
  collection: "survey"
});

module.exports = mongoose.model('survey', survey);
