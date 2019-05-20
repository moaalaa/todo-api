const {User} = require('~models/User');

const auth = (req, res, next) => {
    let token = req.header('Authorization');

    User.findByToken(token)
        .then(user => {

            if (!user) {
                return Promise.reject('Un Authorized')
            }

            req.user = user;
            req.token = token;
            next();

        })
        .catch(e => res.status(401).json({
            messages: e
        }))
};

module.exports = {auth}