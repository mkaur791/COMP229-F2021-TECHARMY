let Survey = require('../models/survey');
let SurveyResponse = require('../models/surveyResponse');
const excelJS = require("exceljs");

// display my surveys page
module.exports.displayMySurveysPage = (req, res, next) => {
    let userId = req.user && req.user._id
    if(userId){
        Survey.find({ 'userid': userId },(err, surveyList) => {
            if(err){
                return console.error(err);
            }
            else{
                console.log("surveyList",surveyList)
                res.render('index', {title: 'My Surveys',path: 'survey/mySurveys',SurveyList:surveyList,username: req.user? req.user.username : ''});
            }
        })
    }
    else{
        res.render('index', {title: 'My Surveys',path: 'survey/mySurveys'})
    }
}

// display add/create survey page
module.exports.displayAddSurveyPage = (req, res, next) => {
    res.render('index', { title: 'Survey',path: 'survey/add',username: req.user? req.user.username : ''});
}

// process add survey page
module.exports.processAddSurvey = (req, res, next) => {

    let totalQuestions =  req.body.questionCount
    let title = req.body.title
    let quesData = req.body
    let data=[]

    // creating survey object for database storage
    for(let i=1;i<=totalQuestions;i++){
        let ques = {
            "ques": quesData["question"+i],
            "type": quesData["question"+i+"type"]
        }
        if(quesData["question"+i+"options"]) ques['options'] = quesData["question"+i+"options"]
        data.push(ques)
    }

    let newSurvey = Survey({
        title,
        ques_and_list:data,
        responses:0,
        questions: data.length,
        userid: req.user._id,
        created: new Date(),
        updated: new Date()
    })

    // create a new survey
    Survey.create(newSurvey ,(err,req,next)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // refresh the survey list
            res.redirect('/');
        }
    })
}

// display edit survey page
module.exports.displayEditSurveyPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit, next) =>{
        if(err){
            console.log(err);
            res.end(err);
        } else {
            console.log('surveyToEdit', surveyToEdit)
            res.render('index', { title: 'Survey',path: 'survey/edit', survey:surveyToEdit,username: req.user? req.user.username : ''});
        }
    })
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

// display take survey page
module.exports.takeSurveyPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToTake, next) =>{
        if(err){
            console.log(err);
            res.end(err);
        } else {
            console.log('surveyToTake', surveyToTake)
            res.render('index', { title: 'Survey',path: 'takeSurvey', survey:surveyToTake,username: req.user? req.user.username : ''});
        }
    })
}

// display take survey page
module.exports.submitSurvey = (req, res, next) => {
    let id = req.params.id;

    let newResponse = SurveyResponse({
        surveyId: id,
        responses: Object.values(req.body) 
    })
    SurveyResponse.create(newResponse ,(err,req,next)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            Survey.findById(id ,(err,surveyToUpdate) =>{
                if(err){
                    console.log("err..",err)
                }
                else{
                    surveyToUpdate.responses = surveyToUpdate.responses+1
                    Survey.updateOne({_id: surveyToUpdate._id} ,surveyToUpdate,(err,result)=>{
                        if(err){
                            console.log("error updating response")
                        }
                        else{
                            // refresh the survey list
                            res.redirect('/');
                        }
                    })
                }
            })
        }
    })
}


// display all surveys in home page 
module.exports.displayHomePage = (req, res, next) => {
        Survey.find((err, surveyList) => {
            if(err){
                return console.error(err);
            }
            else{
                console.log("surveyList",surveyList)
                res.render('index', {title: 'Home',path: 'home',SurveyList:surveyList, username: req.user? req.user.username : ''});
            }
        })
}

module.exports.viewStats = (req, res, next) => {
    let responses={} , stats = []
    let surveyId = req.params.id
    Survey.findById(surveyId,(err,survey)=>{
        let ques_and_list = survey.ques_and_list
        if(err){ console.log(err)}
        else {
            SurveyResponse.find({surveyId:surveyId},(err,surResponseList) =>{
                for(let i =0;i<ques_and_list.length;i++){
                    if(ques_and_list[i].type == 'mcq'){
                        let ans=[]
                        for(let j=0;j<surResponseList.length;j++){
                                ans.push(surResponseList[j].responses[i])
                                responses[ques_and_list[i].ques] = {
                                    answers : ans
                                }
                        }
                        for(let k=0;k<ques_and_list[i].options.length;k++){
                            responses[ques_and_list[i].ques][ques_and_list[i].options[k]] =   responses[ques_and_list[i].ques]['answers'].filter(r => r == ques_and_list[i].options[k]).length
                        }
                    }
                }
                for (const property in responses) {
                    let keys =  Object.keys(responses[property])
                    let values =  Object.values(responses[property])
                    keys.shift()
                    values.shift()
                    let stat = {
                        'question' : property,
                        'option' : keys,
                        'count' : values
                    }
                    stats.push(stat)
                }
                statistics = stats
                res.render('index', {title: 'Reporting',path: 'survey/reporting',stats:stats,responses: survey.responses,username: req.user? req.user.username : ''})
            })
        }
    })
}

