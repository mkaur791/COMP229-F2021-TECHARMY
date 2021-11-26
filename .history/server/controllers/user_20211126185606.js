// display login page
module.exports.displayLoginPage = (req, res, next) => {
    res.render('index', { title: 'Sign In',path: '/login'});
}

// process register page
module.exports.processRegister = (req, res, next) => {

    let userName = req.body.Username
    let password = req.body.Password
    let email = req.body.Email

    // creating survey object for database storage
    let newUser = User({
        userName,
        password,
        email,
    })

}