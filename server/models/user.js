//require modules for the User Model

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

let User = mongoose.Schema(
    {
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required: "username is required"
        },
        password:
        {
            type: String,
            default: "",
            trim: true,
            required: "password is required"

        },
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: "email address is required"
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'users'
    }

);

User.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

User.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};

//Configure option for User Model

let options = ({missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);