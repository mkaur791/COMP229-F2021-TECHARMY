let mongoose = require('mongoose');

let Surveys = mongoose.Schema({
    title: String,
    ques_and_list: Array,
    responses: Number,
    questions: Number,
    created: Date,
    updated: Date,
    userid: String,
    startDate: Date,
    endDate: Date

},
{
  collection: "survey"
});

module.exports = mongoose.model('Surveys', Surveys);