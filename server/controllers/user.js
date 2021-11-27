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
    res.render('index', { title: 'Sign Up',path: 'register',messages: req.flash('registerMessage'),username: req.user? req.user.username : ''});
}

// process register page
module.exports.processRegister = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");            
            if(err.name == "UserExistsError")
            {
                console.log('Error: User Already Exists!')
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );  
                return res.redirect('/register');              
            }
        }
        else
        {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            })
        }
    })
}


module.exports.logoutUser = (req,res,next) => {
    req.logout();
    res.redirect('/')
}

