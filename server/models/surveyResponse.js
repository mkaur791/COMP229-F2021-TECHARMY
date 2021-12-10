let mongoose = require('mongoose');

let SurveyResponse = mongoose.Schema({
    surveyId: String,
    responses: Array 
},
{
  collection: "surveyResponse"
});

module.exports = mongoose.model('SurveyResponse', SurveyResponse);
