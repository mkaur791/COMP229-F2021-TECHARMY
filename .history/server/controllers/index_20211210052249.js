let Survey = require('../models/survey')

// display home page
module.exports.displayHomePage = (req, res, next) => {
    let userId = req.user && req.user._id
    if(userId){
        Survey.find({ 'userid': userId },(err, surveyList) => {
            if(err){
                return console.error(err);
            }
            else{
                console.log("surveyList",surveyList)
                res.render('index', {title: 'Home',path: 'home',SurveyList:surveyList,username: req.user? req.user.username : ''});
            }
        })
    }
    else{
        res.render('index', {title: 'Home',path: 'home'})
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

// display all surveys in home page when signed in (edit 1)
// module.exports.displayAllSurveyPage = (req, res, next) => {
//         Survey.find((err, surveyList) => {
//             if(err){
//                 return console.error(err);
//             }
//             else{
//                 console.log("surveyList",surveyList)
//                 res.render('index', {title: 'All Surveys',path: '/homeORIGIN',SurveyList:surveyList,username: req.user? req.user.username : ''});
//             }
//         })

// }

// display all surveys in home page(edit 2)
module.exports.displayAllSurveyPage = (req, res, next) => {
        Survey.find((err, surveyList) => {
            if(err){
                return console.error(err);
            }
            else{
                console.log("surveyList",surveyList)

                res.render('index', {title: 'Survey List',
                path: 'displayall',
                SurveyList:surveyList
            });
            }
        })

}