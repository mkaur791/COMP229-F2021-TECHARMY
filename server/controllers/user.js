let express = require('express');
let router = express.Router();
let User = require('../models/user')
const bcrypt = require('bcrypt');
let passport = require('passport');
let mongoose = require('mongoose');

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

// display update profile page
module.exports.displayUpdateProfilePage = (req, res, next) => {
    res.render('index', {title: 'Update',path: 'update',messages: req.flash('updateMessage'),user:req.user,username: req.user? req.user.username : ''});
}

// process update profile page
module.exports.processUpdateProfilePage = (req, res, next) => {
    const {email,username,password,newPassword,id} = req.body
    User.findById(id,(err, user) =>{
        if(!err){
            let comparison = bcrypt.compareSync(password, user.password)
            if(comparison){
                // User.find({$and: [{$or: [{username:username},{email:email}]} , {_id : {$ne: id}}]} ,(err, userList) =>{
                    User.find({$and: [{email:email} , {_id : {$ne: id}}]} ,(err, userList) =>{
                    if(err){
                        console.log("err",err)
                    }
                    else{
                        if(userList.length){
                            req.flash(
                                'updateMessage',
                                'The email or username already exists!'
                            );
                            return res.redirect('/update');
                        }
                        else{
                            return res.redirect('/update');
                            // let updatedUser = User({
                            //     "_id":id,
                            //     username: user.username,
                            //     email,
                            //     password: newPassword,
                            //     created : user.created
                            // })
                        
                            // User.updateOne({_id:id} ,updatedUser ,(err) =>{
                            //     if(err){
                            //         console.log(err);
                            //         res.end(err);
                            //     }
                            //     else{
                            //         req.flash(
                            //             'updateMessage',
                            //             'Profile updated successfully'
                            //         );
                            //         res.redirect('/update');
                            //     }
                            // });
                        }
                    }
                })
            }
            else{
                req.flash(
                    'updateMessage',
                    'The current passsword does not match the stored password'
                );
                return res.redirect('/update');
            }
        }
        else{
            console.log("error...",err)
        }
    })
}

module.exports.logoutUser = (req,res,next) => {
    req.logout();
    res.redirect('/')
}

