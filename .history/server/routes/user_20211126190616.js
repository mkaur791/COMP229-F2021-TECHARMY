let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the user model
let user = require('../models/user');

//  GET the User Details page in order to add a new User
router.get('/signup', (req, res, next) => {
//rename according to ejs
    res.render('/signup', {title: 'Register', 
    user: '' 
  })

});

// POST process the User List page and create a new User - CREATE
router.post('/signup', (req, res, next) => {
try {
  const {username, password, email} = req.body
  console.log(req.body);
  if (!username || !password || !email ) {
      console.log("Invalid body fields");
      return done(null, false);
  }
  const query = {
      $or: [{ username: username }, { email: email }]
  };
  console.log(query);
  const user = user.findOne(query);
  if (user) {
      console.log("User already exists!");
      console.log(user);
      return done(null, false);
  }
  else {
      const userData = {
          username,
          password,
          email,
      };
      const newUser = new user(userData);
      newUser.save();
      res.redirect('/');
  }
}
catch (error) {
  done(error);
}

});

module.exports = router;


// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('Placeholder');
// });

// module.exports = router;
