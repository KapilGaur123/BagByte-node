const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY)
}

//          name used in router   export this func
module.exports.generateToken = generateToken;