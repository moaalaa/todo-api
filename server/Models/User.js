const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!,`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        },
    ]

});

// Add Methods To Instance by using "methods" property
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    const user  = this;
    let access  = 'auth';
    let token   = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => token);

};

UserSchema.methods.removeToken = function (bearerToken) {
    const user  = this;

    let token = (bearerToken.split("Bearer ")).pop();
    
    return user.update({
        $pull: {
            tokens: { token }
        }
    })

};

// Add Methods To Model by using "statics" property
UserSchema.statics.findByToken = function (bearerToken) {
    const User = this;
    let decoded;

    let token = (bearerToken.split("Bearer ")).pop();
    
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject('Un Authorized');
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

// Add Methods To Model by using "statics" property
UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;
    

    return User.findOne({email})
        .then(user => {
            if (! user) {
                return Promise.reject("Credentials Not Found")
            }

            if (bcrypt.compareSync(password, user.password)) {
                return Promise.resolve(user);
            }

            return Promise.reject("Credentials Not Found");
        });
};


// Add Event Listener
UserSchema.pre('save', function (next) {
    const user = this;

    // when Save User it hash password
    // but when update the user (but not updating the password) it will hash password again
    // so we check if the password is modified (updated)
    if (user.isModified('password')) {
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        next();
    } else {
        next();
    }


}) 

const User = mongoose.model('User', UserSchema);

module.exports = {User};