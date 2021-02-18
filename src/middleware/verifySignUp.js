const User = require('../models/user.js')

checkDuplicateEmail = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if(user){
        res.status(400).send({
            message: "Email already in use"
        })
        return
    }
    next();
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,

};

module.exports = verifySignUp;