let express = require('express');
let router = express.Router();
let User = require('../models/user')

let passport = require('passport');

// display login page
module.exports.displayLoginPage = (req,res,next) => {
    // check if user is already logged in
    if(!req.user){
        res.render('index',{title:'Sign In', path:'login',messages:req.flash('loginMessage'),username: req.user? req.user.username : ''})
    }
    else{
        return res.redirect('/');
    }
    
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local', (err,user,info) =>{
        if(err){
            // server error
            return next(err);
        }
        // if there is login error
        if(!user){
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err)=>{
            if(err){
                // server error
                return next(err);
            }
            return res.redirect('/');
        })
    })(req,res,next);
}

// display register page
module.exports.displayRegisterPage = (req, res, next) => {
    res.render('index', { title: 'Sign Up',path: 'register'});
}

// process register page
module.exports.processRegister = (req, res, next) => {

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
        console.log(error)
      }

}


module.exports.logoutUser = (req,res,next) => {
    req.logout();
    res.redirect('/')
}

