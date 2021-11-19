let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let surveys = require('../models/survey');

/* GET Survey List page. READ */
// Manu's Part
/*
******** 
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'books',
        books: books
      });
    }
  });

});
******** 
*/

//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('survey/list', {title: 'Add new survey', 
    survey: '' 
  })

});

// POST process the Survey List page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newSurvey = new survey({
        "Title": req.body.Title,
        "Ques_And_List": req.body.Ques_And_List,
        "Responses": req.body.Responses,
        "Questions": req.body.Questions,
        "Created": req.body.Created,
        "Updated": req.body.Updated
    //   "Title": req.body.Title,
    //   "Description": req.body.Description,
    //   "Price": req.body.Price,
    //   "Author": req.body.Author,
    //   "Genre": req.body.Genre
    });

    survey.create(newSurvey, (err, survey) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        //refresh the survey list
        res.redirect('/survey');
      }
    });

});

// GET the Survey List page in order to edit an existing Survey
  router.get('/:id', (req, res, next) => { 

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    survey.findById(id, (err, surveyToEdit) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        //shows the edit view
        res.render('survey/list', {
          title: 'Edit Survey', 
          survey: surveyToEdit
        })
      }
    });

});

// POST - process the information passed from the details form and update the document
  router.post('/:id', (req, res, next) => { 

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;
     
     let updatedSurvey = survey({
       "_id": id,
       "Title": req.body.Title,
       "Ques_And_List": req.body.Ques_And_List,
       "Responses": req.body.Responses,
       "Questions": req.body.Questions,
       "Created": req.body.Created,
       "Updated": req.body.Updated
    //   "Title": req.body.Title,
    //   "Description":req.body.Description,
    //   "Price": req.body.Price,
    //   "Author": req.body.Author,
    //   "Genre": req.body.Genre
     });

     survey.updateOne({_id: id}, updatedSurvey, (err) => {
       if(err) {
         console.log(err);
         res.end(err);
       } else {
         res.redirect('/survey');
       }
     });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    survey.remove({ _id: id }, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/survey');
      }
    });
});


module.exports = router;
